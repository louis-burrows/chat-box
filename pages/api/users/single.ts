import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type NextApiRequestWithArguments = NextApiRequest & {
  uniqueId: string;
}

type Response = {
  status: 'success' | 'fail',
  user?: any;
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
      }
    })

    if (user === null) {
      res.statusCode = 404
      res.json({ status: 'fail' })
    }

    res.statusCode = 200
    res.json({ status: 'success', user })
  } catch {
    res.statusCode = 400
    res.json({ status: 'fail' })
  }
}
