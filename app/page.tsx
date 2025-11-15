// Main page - Executive Orders Tracker
import PageContent from '@/components/PageContent';

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

  return <PageContent data={data} />;
}
