// Main page - Executive Orders Tracker
import StatsCard from '@/components/StatsCard';
import PresidentTable from '@/components/PresidentTable';
import ExecutiveOrdersList from '@/components/ExecutiveOrdersList';
import ExecutiveOrdersTimeline from '@/components/charts/ExecutiveOrdersTimeline';
import OrdersByPresident from '@/components/charts/OrdersByPresident';
import TermComparison from '@/components/charts/TermComparison';
import RunningTotal from '@/components/charts/RunningTotal';
import RecentPresidentsBreakdown from '@/components/charts/RecentPresidentsBreakdown';

async function getExecutiveOrdersData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/executive-orders`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching executive orders:', error);
    return null;
  }
}

export default async function Home() {
  const data = await getExecutiveOrdersData();

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Loading Executive Orders Data...
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please wait while we fetch the latest data from the Federal Register.
          </p>
        </div>
      </div>
    );
  }

  const { total, presidentStats, yearlyStats, orders, lastUpdated } = data;

  // Calculate some interesting stats
  const mostRecent = orders[orders.length - 1];
  const currentYearOrders = orders.filter(
    (order: any) => new Date(order.signing_date).getFullYear() === new Date().getFullYear()
  ).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                How Many Executive Orders?
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Tracking U.S. Presidential Executive Orders from the Federal Register
              </p>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-500">
              Updated: {new Date(lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Executive Orders"
            value={total.toLocaleString()}
            description="Since records began"
          />
          <StatsCard
            title="This Year"
            value={currentYearOrders}
            description={`In ${new Date().getFullYear()}`}
          />
          <StatsCard
            title="Presidents"
            value={presidentStats.length}
            description="Who have issued orders"
          />
          <StatsCard
            title="Most Recent"
            value={mostRecent.president}
            description={new Date(mostRecent.signing_date).toLocaleDateString()}
          />
        </div>

        {/* Visual Analytics Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Visual Analytics
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Interactive charts and graphs to help visualize executive order trends and patterns
            </p>
          </div>

          {/* First Row: Timeline and Running Total */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExecutiveOrdersTimeline yearlyStats={yearlyStats} />
            <RunningTotal yearlyStats={yearlyStats} />
          </div>

          {/* Second Row: Orders by President */}
          <OrdersByPresident stats={presidentStats} />

          {/* Third Row: Term Comparison and Recent Presidents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TermComparison stats={presidentStats} />
            <RecentPresidentsBreakdown stats={presidentStats} />
          </div>
        </div>

        {/* President Stats Table */}
        <PresidentTable stats={presidentStats} />

        {/* Executive Orders List */}
        <ExecutiveOrdersList orders={orders} />

        {/* Footer Info */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            About This Data
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This website pulls data directly from the{' '}
            <a
              href="https://www.federalregister.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-blue-600 dark:hover:text-blue-300"
            >
              Federal Register API
            </a>
            , the official journal of the U.S. government. Executive orders are official documents
            through which the President of the United States manages the operations of the federal
            government. The data is updated regularly to ensure accuracy.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Data source:{' '}
              <a
                href="https://www.federalregister.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Federal Register
              </a>
            </p>
            <p className="mt-2">
              Built with Next.js and deployed on Vercel
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
