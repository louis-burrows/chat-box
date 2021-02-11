import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  name: string;
  avatar: string;
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail';
}

type UpdateUser = (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => void

const UpdateUser: UpdateUser = async (req, res) => {
  const prisma = new PrismaClient()
  const { body, method } = req
  const { name, avatar, uniqueId } = body

  if (method !== 'POST' || !uniqueId) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  //if an email was posted, then look through the users and find the first instance of where the email matches the one sent
  try {
    const user = await prisma.user.findFirst({
      where: {
        userId: uniqueId
      }
    })

    if (user === null) {
      throw new Error('User not found')
    } else {
      await prisma.user.update({
        data: {
          name: name || '',
          avatar: avatar || ''
        },
        where: {
          id: user.id
        }
      })

      res.statusCode = 200
      res.json({ status: 'success' })
    }
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}

export default UpdateUser
