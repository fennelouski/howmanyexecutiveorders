import { NextResponse } from 'next/server';
import { getExecutiveOrdersData } from '@/lib/federalRegister';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(await getExecutiveOrdersData());
  } catch (error) {
    console.error('Error fetching executive orders:', error);
    return NextResponse.json({ error: 'Failed to fetch executive orders data' }, { status: 500 });
  }
}
