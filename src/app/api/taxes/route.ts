import { NextRequest, NextResponse } from 'next/server'
import { provinceRates, calculateGST } from '../../src/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear()
  const province = searchParams.get('province') || 'ON'
  
  const taxRate = provinceRates[province]
  
  return NextResponse.json({
    year,
    province,
    rate: taxRate,
    rateFormatted: `${(taxRate * 100).toFixed(1)}%`,
    note: 'Add DATABASE_URL to calculate from actual transactions'
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { amount, province = 'ON' } = body
  
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }
  
  const gstHst = calculateGST(amount, province)
  
  return NextResponse.json({
    amount,
    province,
    gstHst,
    total: amount + gstHst,
    breakdown: {
      base: amount,
      tax: gstHst
    }
  })
}
