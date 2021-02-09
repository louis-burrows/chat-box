import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
const postmark = require('postmark')

//these are predefined types supplied by next, onto which we are adding the type of email:string, as this is also a property we will want to exchange
type NextApiRequestWithArguments = NextApiRequest & {
  email: string;
}

type Response = {
  status: 'success' | 'fail';
  message: string
}

type CreateUser = (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => void

const postmarkClient = new postmark.Client('0117bb44-943f-403c-a05b-eb553144ec86')

//createUser has the type pre-defined above
const CreateUser: CreateUser = async (req, res) => {
  const prisma = new PrismaClient()
  const { body, method } = req
  const { email } = body

  //if the post failed, or a post was made but it was not an email, then send out a error code of 400, and a response of status and message below
  if (method !== 'POST' || !email) {
    res.statusCode = 400
    res.json({ status: 'fail', message: "Please try again, no email was sent" })
  }

  //if an email was posted, then look through the users and find the first instance of where the email matches the one sent
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (user === null) {
      // doesn't exist, create unique id, and assign that user an email and new id
      const newUserId = uuidv4()
      await prisma.user.create({
        data: {
          email,
          userId: newUserId
        }
      })

      // send email..
      postmarkClient.sendEmailWithTemplate({
        From: 'info@clearabee.co.uk',
        To: email,
        TemplateId: 22156602,
        TemplateModel: {
          action_url: `http://localhost:3000/auth/${newUserId}`
        }
      })
    } else if (user.active === false) {
      // exists, but is not yet active, resend their activation email
      postmarkClient.sendEmailWithTemplate({
        From: 'info@clearabee.co.uk',
        To: email,
        TemplateId: 22156602,
        TemplateModel: {
          action_url: `http://localhost:3000/auth/${user.userId}`
        }
      })
    } else {
      // user exists and is active, send them the login email
      postmarkClient.sendEmailWithTemplate({
        From: 'info@clearabee.co.uk',
        To: email,
        TemplateId: 22156604,
        TemplateModel: {
          action_url: `http://localhost:3000/auth/${user.userId}`
        }
      })
    }
    //this is the successful return from the above working
    res.statusCode = 200
    res.json({ status: 'success', message: "A verification email has been sent to the provided details" })
  } catch {
    //this is the return from it not working for some other reason
    res.statusCode = 400
    res.json({ status: 'fail', message: "Please try again, no email was sent" })
  }
}

export default CreateUser
