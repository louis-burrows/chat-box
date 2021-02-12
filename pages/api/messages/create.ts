import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  chatroomId: number;
  message: string;
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail'
}

export default async (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => {
  const prisma = new PrismaClient()
  const { body, method } = req
  const { chatroomId, message, uniqueId } = body

  if (method !== 'POST' || !uniqueId || !chatroomId || !message) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  try {
    const chatroom = await prisma.chatroom.findFirst({
      where: {
        id: parseInt(chatroomId as string || ''),
        users: {
          some: {
            userId: uniqueId as string || ''
          }
        }
      }
    })

    const sender = await prisma.user.findFirst({
      where: {
        userId: uniqueId as string
      }
    })

    if (chatroom === null || sender === null) {
      throw new Error('Failed to find chatroom or user')
    }

    await prisma.message.create({
      data: {
        senderId: sender.id,
        chatroomId: chatroom.id,
        message: message as string,
        timestamp: new Date
      }
    })

    res.statusCode = 200
    res.json({ status: 'success' })
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
