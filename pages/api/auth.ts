import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail';
}

export default async (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => {
  const prisma = new PrismaClient()
  const { body, method } = req
  const { uniqueId } = body

  // if post was not successful, or there was no id, error straight away
  if (method !== 'POST' || !uniqueId) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  // if there is a user id, find it
  try {
    const user = await prisma.user.findFirst({
      where: {
        userId: uniqueId
      }
    })

    // if the user doesn't exist, we'll error
    if (user === null) {
      throw new Error('User doesnt exist')
    } else {
      if (!user.active) {
        // if they exist but are not set as active, we will set them as active + return success
        await prisma.user.update({
          data: {
            active: true
          },
          where: {
            userId: uniqueId
          }
        })
      }

      // if they exist and are already active, we will just return success
      res.statusCode = 200
      res.json({ status: 'success' })
    }
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
