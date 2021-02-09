import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail',
  chatrooms?: any[];
}

export default async (req: NextApiRequestWithArguments, res: NextApiResponse<Response>) => {
  const prisma = new PrismaClient()
  const { query, method } = req
  const { uniqueId } = query

  if (method !== 'GET' || !uniqueId) {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        userId: uniqueId as string || ''
      },
      include: {
        chatrooms: {
          include: {
            owner: true,
            users: true
          }
        }
      }
    })

    res.statusCode = 200
    res.json({ status: 'success', chatrooms: user?.chatrooms || [] })
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
