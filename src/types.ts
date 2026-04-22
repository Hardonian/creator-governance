export interface User {
  id: string
  email: string
  stripeAccountId?: string
  createdAt: Date
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  currency: string
  stripeId: string
  type: 'payment' | 'refund' | 'fee' | 'dispute'
  category: string
  createdAt: Date
}

export interface TaxReport {
  id: string
  userId: string
  year: number
  quarter?: number
  grossRevenue: number
  gstHst: number
  status: 'draft' | 'final'
  createdAt: Date
}

export type ProvinceTax = {
  [key: string]: number
}

export const provinceRates: ProvinceTax = {
  ON: 0.13,   // HST
  BC: 0.12,   // GST + PST
  AB: 0.05,   // GST only
  QC: 0.14975, // GST + QST
  NS: 0.15,   // HST
  NB: 0.15,   // HST
  PE: 0.15,   // HST
  NL: 0.15,   // HST
  MB: 0.12,   // GST + PST
  SK: 0.11,   // GST + PST
  NT: 0.05,   // GST only
  YT: 0.05,   // GST only
  NU: 0.05    // GST only
}

export function calculateGST(amount: number, province: string = 'ON'): number {
  const rate = provinceRates[province] || provinceRates.ON
  return Math.round(amount * rate)
}
