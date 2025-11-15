// Federal Register API integration
import { FederalRegisterResponse, ExecutiveOrder, PresidentStats } from '@/types';

const FEDERAL_REGISTER_API = 'https://www.federalregister.gov/api/v1';

// Map document signers to standardized president names
const presidentMap: Record<string, string> = {
  'Joseph R. Biden Jr.': 'Joe Biden',
  'Donald J. Trump': 'Donald Trump',
  'Barack Obama': 'Barack Obama',
  'George W. Bush': 'George W. Bush',
  'William J. Clinton': 'Bill Clinton',
  'George Bush': 'George H.W. Bush',
  'Ronald Reagan': 'Ronald Reagan',
  'Jimmy Carter': 'Jimmy Carter',
  'Gerald R. Ford': 'Gerald Ford',
  'Richard Nixon': 'Richard Nixon',
};

function normalizePresidentName(name: string): string {
  return presidentMap[name] || name;
}

export async function fetchExecutiveOrders(
  page = 1,
  perPage = 1000,
  startDate?: string,
  endDate?: string
): Promise<FederalRegisterResponse> {
  const params = new URLSearchParams({
    'conditions[type]': 'PRESDOCU',
    'conditions[presidential_document_type]': 'executive_order',
    'per_page': perPage.toString(),
    'page': page.toString(),
    'order': 'oldest',
    'fields[]': ['document_number', 'title', 'abstract', 'publication_date', 'signing_date', 'html_url', 'pdf_url', 'citation'].join(','),
  });

  if (startDate) {
    params.append('conditions[publication_date][gte]', startDate);
  }
  if (endDate) {
    params.append('conditions[publication_date][lte]', endDate);
  }

  const url = `${FEDERAL_REGISTER_API}/documents.json?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch executive orders: ${response.statusText}`);
  }

  return response.json();
}

export async function getAllExecutiveOrders(): Promise<ExecutiveOrder[]> {
  const allOrders: ExecutiveOrder[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchExecutiveOrders(currentPage, 1000);

    // Add president information from the title/abstract parsing
    const ordersWithPresident = response.results.map(order => {
      // Try to extract president from the signing date or use a lookup
      const president = extractPresidentFromOrder(order);
      return {
        ...order,
        president,
      } as ExecutiveOrder;
    });

    allOrders.push(...ordersWithPresident);

    hasMore = response.next_page_url !== null;
    currentPage++;

    // Safety limit to prevent infinite loops
    if (currentPage > 100) {
      break;
    }
  }

  return allOrders;
}

// Extract or infer president based on signing date
function extractPresidentFromOrder(order: any): string {
  const signingDate = order.signing_date || order.publication_date;
  const year = new Date(signingDate).getFullYear();

  // Presidential terms mapping
  if (year >= 2021) return 'Joe Biden';
  if (year >= 2017 && year < 2021) return 'Donald Trump';
  if (year >= 2009 && year < 2017) return 'Barack Obama';
  if (year >= 2001 && year < 2009) return 'George W. Bush';
  if (year >= 1993 && year < 2001) return 'Bill Clinton';
  if (year >= 1989 && year < 1993) return 'George H.W. Bush';
  if (year >= 1981 && year < 1989) return 'Ronald Reagan';
  if (year >= 1977 && year < 1981) return 'Jimmy Carter';
  if (year >= 1974 && year < 1977) return 'Gerald Ford';
  if (year >= 1969 && year < 1974) return 'Richard Nixon';
  if (year >= 1963 && year < 1969) return 'Lyndon B. Johnson';
  if (year >= 1961 && year < 1963) return 'John F. Kennedy';
  if (year >= 1953 && year < 1961) return 'Dwight D. Eisenhower';
  if (year >= 1945 && year < 1953) return 'Harry S. Truman';
  if (year >= 1933 && year < 1945) return 'Franklin D. Roosevelt';

  return 'Unknown';
}

export function calculatePresidentStats(orders: ExecutiveOrder[]): PresidentStats[] {
  const stats = new Map<string, { count: number; years: number[] }>();

  orders.forEach(order => {
    const president = order.president;
    const year = new Date(order.signing_date || order.publication_date).getFullYear();

    if (!stats.has(president)) {
      stats.set(president, { count: 0, years: [] });
    }

    const stat = stats.get(president)!;
    stat.count++;
    stat.years.push(year);
  });

  return Array.from(stats.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      startYear: Math.min(...data.years),
      endYear: Math.max(...data.years),
    }))
    .sort((a, b) => b.startYear - a.startYear);
}

export function getTotalCount(orders: ExecutiveOrder[]): number {
  return orders.length;
}

export function getYearlyStats(orders: ExecutiveOrder[]): Array<{ year: number; count: number }> {
  const yearCounts = new Map<number, number>();

  orders.forEach(order => {
    const year = new Date(order.signing_date || order.publication_date).getFullYear();
    yearCounts.set(year, (yearCounts.get(year) || 0) + 1);
  });

  return Array.from(yearCounts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);
}
