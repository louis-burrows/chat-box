import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  id: string;
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail',
  chatroom?: any;
}

export default async (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => {
  const prisma = new PrismaClient()
  const { query, method } = req
  const { id, uniqueId } = query

  if (method !== 'GET' || !uniqueId || !id) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  try {
    const chatroom = await prisma.chatroom.findFirst({
      where: {
        id: parseInt(id as string || ''),
        users: {
          some: {
            userId: uniqueId as string || ''
          }
        }
      },
      include: {
        users: true,
        owner: true,
        messages: {
          orderBy: {
            timestamp: 'desc'
          },
          include: {
            sender: true
          }
        }
      }
    })

    if (chatroom === null) {
      res.statusCode = 404
      res.json({ status: 'fail' })
    }

    res.statusCode = 200
    res.json({ status: 'success', chatroom })
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
