// API route to fetch executive orders data
import { NextResponse } from 'next/server';
import { getAllExecutiveOrders, calculatePresidentStats, getTotalCount, getYearlyStats } from '@/lib/federalRegister';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const orders = await getAllExecutiveOrders();
    const total = getTotalCount(orders);
    const presidentStats = await calculatePresidentStats(orders);
    const yearlyStats = getYearlyStats(orders);

    return NextResponse.json({
      total,
      presidentStats,
      yearlyStats,
      orders,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching executive orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch executive orders data' },
      { status: 500 }
    );
  }
}
