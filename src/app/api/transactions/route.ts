import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Mock database for demo
const transactions: Array<{
  id: string
  amount: number
  currency: string
  type: string
  category: string
  createdAt: string
}> = []

const TransactionSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('CAD'),
  type: z.enum(['payment', 'refund', 'fee', 'dispute']),
  category: z.string()
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')
  
  return NextResponse.json({
    transactions: transactions.slice(offset, offset + limit),
    total: transactions.length,
    hasMore: offset + limit < transactions.length
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = TransactionSchema.safeParse(body)
  
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid transaction', details: result.error.issues },
      { status: 400 }
    )
  }
  
  const transaction = {
    id: crypto.randomUUID(),
    ...result.data,
    createdAt: new Date().toISOString()
  }
  
  transactions.push(transaction)
  
  return NextResponse.json({ transaction }, { status: 201 })
}
