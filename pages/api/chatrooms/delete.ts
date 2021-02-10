import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  id: string;
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail'
}

export default async (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => {
  const prisma = new PrismaClient()
  const { query, method } = req
  const { id, uniqueId } = query

  if (method !== 'DELETE' || !uniqueId || !id) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  try {
    const chatroom = await prisma.chatroom.findFirst({
      where: {
        id: parseInt(id as string || ''),
        owner: {
          userId: uniqueId as string || ''
        }
      }
    })

    if (chatroom === null) {
      throw new Error('Could not find chatroom with that Id owned by the user with this uniqueId')
    }

    await prisma.chatroom.delete({
      where: {
        id: parseInt(id as string || '')
      }
    })

    res.statusCode = 200
    res.json({ status: 'success' })
  } catch (error) {
    console.log('error', error)
    console.log('id', id)
    console.log('uniqueId', uniqueId)
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
