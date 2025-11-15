// Federal Register API integration
import { FederalRegisterResponse, ExecutiveOrder, PresidentStats } from '@/types';
import { PRESIDENTS, getPresidentTerm, getWikipediaTitle, getPresidentParty } from './presidentData';
import { getOrderContext, isCongressInSession, isLameDuckPeriod } from './congressionalSessions';
import { getPresidentImage } from './wikipediaImages';

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

    // Add enhanced metadata to each order
    const ordersWithMetadata = response.results.map(order => {
      // Extract president from signing date
      const president = extractPresidentFromOrder(order);
      const signingDate = order.signing_date || order.publication_date;

      // Get president term information
      const presidentData = PRESIDENTS.find(p => p.name === president);
      const termInfo = getPresidentTerm(president, signingDate);

      // Get congressional context
      const context = termInfo
        ? getOrderContext(
            signingDate,
            president,
            termInfo.termNumber,
            presidentData?.totalTerms || 1
          )
        : null;

      return {
        ...order,
        president,
        termNumber: termInfo?.termNumber,
        congressNumber: context?.congressNumber,
        duringCongressionalSession: context?.inSession,
        isLameDuck: context?.isLameDuck,
        isLastTerm: context?.isLastTerm,
      } as ExecutiveOrder;
    });

    allOrders.push(...ordersWithMetadata);

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

export async function calculatePresidentStats(orders: ExecutiveOrder[]): Promise<PresidentStats[]> {
  const stats = new Map<string, {
    count: number;
    years: number[];
    firstTermCount: number;
    secondTermCount: number;
    duringSessionCount: number;
    lameDuckCount: number;
  }>();

  // Calculate stats from orders
  orders.forEach(order => {
    const president = order.president;
    const year = new Date(order.signing_date || order.publication_date).getFullYear();

    if (!stats.has(president)) {
      stats.set(president, {
        count: 0,
        years: [],
        firstTermCount: 0,
        secondTermCount: 0,
        duringSessionCount: 0,
        lameDuckCount: 0,
      });
    }

    const stat = stats.get(president)!;
    stat.count++;
    stat.years.push(year);

    // Track term-specific counts
    if (order.termNumber === 1) {
      stat.firstTermCount++;
    } else if (order.termNumber === 2) {
      stat.secondTermCount++;
    }

    // Track congressional session counts
    if (order.duringCongressionalSession) {
      stat.duringSessionCount++;
    }

    // Track lame duck counts
    if (order.isLameDuck) {
      stat.lameDuckCount++;
    }
  });

  // Convert to array and fetch images
  const statsArray = await Promise.all(
    Array.from(stats.entries()).map(async ([name, data]) => {
      const presidentData = PRESIDENTS.find(p => p.name === name);
      const wikipediaTitle = getWikipediaTitle(name);

      let imageUrl = '';
      if (wikipediaTitle) {
        try {
          imageUrl = await getPresidentImage(name, wikipediaTitle);
        } catch (error) {
          console.error(`Failed to fetch image for ${name}:`, error);
        }
      }

      return {
        name,
        count: data.count,
        startYear: Math.min(...data.years),
        endYear: Math.max(...data.years),
        imageUrl,
        party: getPresidentParty(name) || 'Unknown',
        totalTerms: presidentData?.totalTerms || 1,
        firstTermCount: data.firstTermCount,
        secondTermCount: data.secondTermCount,
        duringSessionCount: data.duringSessionCount,
        lameDuckCount: data.lameDuckCount,
      };
    })
  );

  return statsArray.sort((a, b) => b.startYear - a.startYear);
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
