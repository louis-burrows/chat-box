import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
const postmark = require('postmark')

type NextApiRequestWithArguments = NextApiRequest & {
  uniqueId: string;
  name: string;
  users: string[];
}

type Response = {
  status: 'success' | 'fail',
  chatroom?: any;
}

const postmarkClient = new postmark.Client('0117bb44-943f-403c-a05b-eb553144ec86')

export default async (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => {
  const prisma = new PrismaClient()
  const { body, method } = req
  const { name: chatroomName, users, uniqueId } = body

  // if any of these things are not true, then send a fail
  if (method !== 'POST' || !uniqueId || !chatroomName || !users || !Array.isArray(users)) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  try {
    // get the owner user based on the unique id we sent to the api
    // if the uniqueId of the room does not exist, this will fail.
    const owner = await prisma.user.findFirst({
      where: {
        userId: uniqueId as string || ''
      }
    })

    if (owner === null) {
      throw new Error('Could not find owner user')
    }

    // create the chatroom
    const newChatroom = await prisma.chatroom.create({
      data: {
        name: chatroomName as string || '',
        ownerId: owner.id,
        messages: {
          //this is giving the chat room its first message, identified to the owner, and welcoming participants. Prisma allows a a create within a create
          create: {
            message: `Welcome to ${chatroomName}`,
            timestamp: new Date,
            senderId: owner.id
          }
        }
      }
    })

    // if the above failed, send this error
    if (newChatroom === null) {
      throw new Error('Could not create chatroom')
    }

    // add the owner to the chatroom also..
    await prisma.user.update({
      where: {
        id: owner.id
      },
      data: {
        chatrooms: {
          // using prisma's connect, to connect the owner to the chatroom that was just created, where the owner.id is that which was first registered.
          connect: [{ id: newChatroom.id }]
        }
      }
    });

    // loop over our different users and assign them to the chatroom/invite them if they don't exist
    // get each individual user based on the emails we sent to the api
    (users as string[]).forEach(async usrEmail => {
      const user = await prisma.user.findFirst({
        where: {
          email: usrEmail
        }
      })

      if (user === null) {
        // dont exist, create and invite them, with them already attached to the chat room
        const newUserId = uuidv4()
        await prisma.user.create({
          data: {
            userId: newUserId,
            email: usrEmail,
            chatrooms: {
              connect: [{ id: newChatroom.id }]
            }
          }
        })

        postmarkClient.sendEmailWithTemplate({
          From: 'info@clearabee.co.uk',
          To: usrEmail,
          TemplateId: 22156602,
          TemplateModel: {
            action_url: `http://localhost:3000/auth/${newUserId}`
          }
        })
      } else {
        // exists, let them know they've been added to a new chatroom. This connects their id to the new chatroom, where their email matches one assigned in the create chatroom function
        const usr = await prisma.user.update({
          data: {
            chatrooms: {
              connect: [{ id: newChatroom.id }]
            }
          },
          where: {
            email: usrEmail
          },
        })

        postmarkClient.sendEmailWithTemplate({
          From: 'info@clearabee.co.uk',
          To: usrEmail,
          TemplateId: 22183152,
          TemplateModel: {
            chatroom_name: chatroomName,
            action_url: `http://localhost:3000/auth/${usr.userId}`
          }
        })
      }
    })

    res.statusCode = 200
    res.json({ status: 'success', chatroom: newChatroom })
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
