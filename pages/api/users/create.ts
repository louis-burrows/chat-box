import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import postmark from 'postmark'

type NextApiRequestWithArguments = NextApiRequest & {
  email: string;
}

type Response = {
  status: 'success' | 'fail';
}

type CreateUser = (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => void

const postmarkClient = new postmark.Client("POSTMARK-SERVER-API-TOKEN-HERE");

const CreateUser: CreateUser = async (req, res) => {
  const prisma = new PrismaClient()

  if (req.method !== 'POST' || !req.email) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.email
      }
    })

    if (user === null) {
      // doesn't exist, create..
      const newUser = await prisma.user.create({
        data: {
          email: req.email,
          userId: uuidv4()
        }
      })

      // send email..
      postmarkClient.sendEmail({
        From: '',
        To: '',
        Subject: ''
      })
    } else if (user.active === false) {
      // exists, but is not yet active, resend their activation email
    } else {
      // user exists as is active, send them the login email
    }

    res.statusCode = 200
    res.json({ status: 'success' })
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}

export default CreateUser
