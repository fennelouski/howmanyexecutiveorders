/**
 * Comprehensive presidential data including terms, Wikipedia info, and congressional sessions
 */

export interface PresidentTerm {
  president: string;
  termNumber: number; // 1 for first term, 2 for second term, etc.
  startDate: string; // ISO date
  endDate: string | null; // ISO date, null if current
  congresses: number[]; // Congress numbers during this term
  wikipediaTitle: string; // Title for Wikipedia API
}

export interface President {
  name: string;
  wikipediaTitle: string;
  terms: PresidentTerm[];
  totalTerms: number;
}

/**
 * Complete list of US Presidents with their terms
 * Data sourced from history.house.gov and whitehousehistory.org
 */
export const PRESIDENTS: President[] = [
  {
    name: "George Washington",
    wikipediaTitle: "George_Washington",
    totalTerms: 2,
    terms: [
      { president: "George Washington", termNumber: 1, startDate: "1789-04-30", endDate: "1793-03-03", congresses: [1, 2], wikipediaTitle: "George_Washington" },
      { president: "George Washington", termNumber: 2, startDate: "1793-03-04", endDate: "1797-03-03", congresses: [3, 4], wikipediaTitle: "George_Washington" }
    ]
  },
  {
    name: "John Adams",
    wikipediaTitle: "John_Adams",
    totalTerms: 1,
    terms: [
      { president: "John Adams", termNumber: 1, startDate: "1797-03-04", endDate: "1801-03-03", congresses: [5, 6], wikipediaTitle: "John_Adams" }
    ]
  },
  {
    name: "Thomas Jefferson",
    wikipediaTitle: "Thomas_Jefferson",
    totalTerms: 2,
    terms: [
      { president: "Thomas Jefferson", termNumber: 1, startDate: "1801-03-04", endDate: "1805-03-03", congresses: [7, 8], wikipediaTitle: "Thomas_Jefferson" },
      { president: "Thomas Jefferson", termNumber: 2, startDate: "1805-03-04", endDate: "1809-03-03", congresses: [9, 10], wikipediaTitle: "Thomas_Jefferson" }
    ]
  },
  {
    name: "James Madison",
    wikipediaTitle: "James_Madison",
    totalTerms: 2,
    terms: [
      { president: "James Madison", termNumber: 1, startDate: "1809-03-04", endDate: "1813-03-03", congresses: [11, 12], wikipediaTitle: "James_Madison" },
      { president: "James Madison", termNumber: 2, startDate: "1813-03-04", endDate: "1817-03-03", congresses: [13, 14], wikipediaTitle: "James_Madison" }
    ]
  },
  {
    name: "James Monroe",
    wikipediaTitle: "James_Monroe",
    totalTerms: 2,
    terms: [
      { president: "James Monroe", termNumber: 1, startDate: "1817-03-04", endDate: "1821-03-03", congresses: [15, 16], wikipediaTitle: "James_Monroe" },
      { president: "James Monroe", termNumber: 2, startDate: "1821-03-04", endDate: "1825-03-03", congresses: [17, 18], wikipediaTitle: "James_Monroe" }
    ]
  },
  {
    name: "John Quincy Adams",
    wikipediaTitle: "John_Quincy_Adams",
    totalTerms: 1,
    terms: [
      { president: "John Quincy Adams", termNumber: 1, startDate: "1825-03-04", endDate: "1829-03-03", congresses: [19, 20], wikipediaTitle: "John_Quincy_Adams" }
    ]
  },
  {
    name: "Andrew Jackson",
    wikipediaTitle: "Andrew_Jackson",
    totalTerms: 2,
    terms: [
      { president: "Andrew Jackson", termNumber: 1, startDate: "1829-03-04", endDate: "1833-03-03", congresses: [21, 22], wikipediaTitle: "Andrew_Jackson" },
      { president: "Andrew Jackson", termNumber: 2, startDate: "1833-03-04", endDate: "1837-03-03", congresses: [23, 24], wikipediaTitle: "Andrew_Jackson" }
    ]
  },
  {
    name: "Martin Van Buren",
    wikipediaTitle: "Martin_Van_Buren",
    totalTerms: 1,
    terms: [
      { president: "Martin Van Buren", termNumber: 1, startDate: "1837-03-04", endDate: "1841-03-03", congresses: [25, 26], wikipediaTitle: "Martin_Van_Buren" }
    ]
  },
  {
    name: "William Henry Harrison",
    wikipediaTitle: "William_Henry_Harrison",
    totalTerms: 1,
    terms: [
      { president: "William Henry Harrison", termNumber: 1, startDate: "1841-03-04", endDate: "1841-04-04", congresses: [27], wikipediaTitle: "William_Henry_Harrison" }
    ]
  },
  {
    name: "John Tyler",
    wikipediaTitle: "John_Tyler",
    totalTerms: 1,
    terms: [
      { president: "John Tyler", termNumber: 1, startDate: "1841-04-06", endDate: "1845-03-03", congresses: [27, 28], wikipediaTitle: "John_Tyler" }
    ]
  },
  {
    name: "James K. Polk",
    wikipediaTitle: "James_K._Polk",
    totalTerms: 1,
    terms: [
      { president: "James K. Polk", termNumber: 1, startDate: "1845-03-04", endDate: "1849-03-03", congresses: [29, 30], wikipediaTitle: "James_K._Polk" }
    ]
  },
  {
    name: "Zachary Taylor",
    wikipediaTitle: "Zachary_Taylor",
    totalTerms: 1,
    terms: [
      { president: "Zachary Taylor", termNumber: 1, startDate: "1849-03-05", endDate: "1850-07-09", congresses: [31], wikipediaTitle: "Zachary_Taylor" }
    ]
  },
  {
    name: "Millard Fillmore",
    wikipediaTitle: "Millard_Fillmore",
    totalTerms: 1,
    terms: [
      { president: "Millard Fillmore", termNumber: 1, startDate: "1850-07-10", endDate: "1853-03-03", congresses: [31, 32], wikipediaTitle: "Millard_Fillmore" }
    ]
  },
  {
    name: "Franklin Pierce",
    wikipediaTitle: "Franklin_Pierce",
    totalTerms: 1,
    terms: [
      { president: "Franklin Pierce", termNumber: 1, startDate: "1853-03-04", endDate: "1857-03-03", congresses: [33, 34], wikipediaTitle: "Franklin_Pierce" }
    ]
  },
  {
    name: "James Buchanan",
    wikipediaTitle: "James_Buchanan",
    totalTerms: 1,
    terms: [
      { president: "James Buchanan", termNumber: 1, startDate: "1857-03-04", endDate: "1861-03-03", congresses: [35, 36], wikipediaTitle: "James_Buchanan" }
    ]
  },
  {
    name: "Abraham Lincoln",
    wikipediaTitle: "Abraham_Lincoln",
    totalTerms: 2,
    terms: [
      { president: "Abraham Lincoln", termNumber: 1, startDate: "1861-03-04", endDate: "1865-03-03", congresses: [37, 38], wikipediaTitle: "Abraham_Lincoln" },
      { president: "Abraham Lincoln", termNumber: 2, startDate: "1865-03-04", endDate: "1865-04-15", congresses: [39], wikipediaTitle: "Abraham_Lincoln" }
    ]
  },
  {
    name: "Andrew Johnson",
    wikipediaTitle: "Andrew_Johnson",
    totalTerms: 1,
    terms: [
      { president: "Andrew Johnson", termNumber: 1, startDate: "1865-04-15", endDate: "1869-03-03", congresses: [39, 40], wikipediaTitle: "Andrew_Johnson" }
    ]
  },
  {
    name: "Ulysses S. Grant",
    wikipediaTitle: "Ulysses_S._Grant",
    totalTerms: 2,
    terms: [
      { president: "Ulysses S. Grant", termNumber: 1, startDate: "1869-03-04", endDate: "1873-03-03", congresses: [41, 42], wikipediaTitle: "Ulysses_S._Grant" },
      { president: "Ulysses S. Grant", termNumber: 2, startDate: "1873-03-04", endDate: "1877-03-03", congresses: [43, 44], wikipediaTitle: "Ulysses_S._Grant" }
    ]
  },
  {
    name: "Rutherford B. Hayes",
    wikipediaTitle: "Rutherford_B._Hayes",
    totalTerms: 1,
    terms: [
      { president: "Rutherford B. Hayes", termNumber: 1, startDate: "1877-03-04", endDate: "1881-03-03", congresses: [45, 46], wikipediaTitle: "Rutherford_B._Hayes" }
    ]
  },
  {
    name: "James A. Garfield",
    wikipediaTitle: "James_A._Garfield",
    totalTerms: 1,
    terms: [
      { president: "James A. Garfield", termNumber: 1, startDate: "1881-03-04", endDate: "1881-09-19", congresses: [47], wikipediaTitle: "James_A._Garfield" }
    ]
  },
  {
    name: "Chester A. Arthur",
    wikipediaTitle: "Chester_A._Arthur",
    totalTerms: 1,
    terms: [
      { president: "Chester A. Arthur", termNumber: 1, startDate: "1881-09-20", endDate: "1885-03-03", congresses: [47, 48], wikipediaTitle: "Chester_A._Arthur" }
    ]
  },
  {
    name: "Grover Cleveland",
    wikipediaTitle: "Grover_Cleveland",
    totalTerms: 2,
    terms: [
      { president: "Grover Cleveland", termNumber: 1, startDate: "1885-03-04", endDate: "1889-03-03", congresses: [49, 50], wikipediaTitle: "Grover_Cleveland" },
      { president: "Grover Cleveland", termNumber: 2, startDate: "1893-03-04", endDate: "1897-03-03", congresses: [53, 54], wikipediaTitle: "Grover_Cleveland" }
    ]
  },
  {
    name: "Benjamin Harrison",
    wikipediaTitle: "Benjamin_Harrison",
    totalTerms: 1,
    terms: [
      { president: "Benjamin Harrison", termNumber: 1, startDate: "1889-03-04", endDate: "1893-03-03", congresses: [51, 52], wikipediaTitle: "Benjamin_Harrison" }
    ]
  },
  {
    name: "William McKinley",
    wikipediaTitle: "William_McKinley",
    totalTerms: 2,
    terms: [
      { president: "William McKinley", termNumber: 1, startDate: "1897-03-04", endDate: "1901-03-03", congresses: [55, 56], wikipediaTitle: "William_McKinley" },
      { president: "William McKinley", termNumber: 2, startDate: "1901-03-04", endDate: "1901-09-14", congresses: [57], wikipediaTitle: "William_McKinley" }
    ]
  },
  {
    name: "Theodore Roosevelt",
    wikipediaTitle: "Theodore_Roosevelt",
    totalTerms: 2,
    terms: [
      { president: "Theodore Roosevelt", termNumber: 1, startDate: "1901-09-14", endDate: "1905-03-03", congresses: [57, 58], wikipediaTitle: "Theodore_Roosevelt" },
      { president: "Theodore Roosevelt", termNumber: 2, startDate: "1905-03-04", endDate: "1909-03-03", congresses: [59, 60], wikipediaTitle: "Theodore_Roosevelt" }
    ]
  },
  {
    name: "William Howard Taft",
    wikipediaTitle: "William_Howard_Taft",
    totalTerms: 1,
    terms: [
      { president: "William Howard Taft", termNumber: 1, startDate: "1909-03-04", endDate: "1913-03-03", congresses: [61, 62], wikipediaTitle: "William_Howard_Taft" }
    ]
  },
  {
    name: "Woodrow Wilson",
    wikipediaTitle: "Woodrow_Wilson",
    totalTerms: 2,
    terms: [
      { president: "Woodrow Wilson", termNumber: 1, startDate: "1913-03-04", endDate: "1917-03-03", congresses: [63, 64], wikipediaTitle: "Woodrow_Wilson" },
      { president: "Woodrow Wilson", termNumber: 2, startDate: "1917-03-04", endDate: "1921-03-03", congresses: [65, 66], wikipediaTitle: "Woodrow_Wilson" }
    ]
  },
  {
    name: "Warren G. Harding",
    wikipediaTitle: "Warren_G._Harding",
    totalTerms: 1,
    terms: [
      { president: "Warren G. Harding", termNumber: 1, startDate: "1921-03-04", endDate: "1923-08-02", congresses: [67, 68], wikipediaTitle: "Warren_G._Harding" }
    ]
  },
  {
    name: "Calvin Coolidge",
    wikipediaTitle: "Calvin_Coolidge",
    totalTerms: 2,
    terms: [
      { president: "Calvin Coolidge", termNumber: 1, startDate: "1923-08-03", endDate: "1925-03-03", congresses: [68], wikipediaTitle: "Calvin_Coolidge" },
      { president: "Calvin Coolidge", termNumber: 2, startDate: "1925-03-04", endDate: "1929-03-03", congresses: [69, 70], wikipediaTitle: "Calvin_Coolidge" }
    ]
  },
  {
    name: "Herbert Hoover",
    wikipediaTitle: "Herbert_Hoover",
    totalTerms: 1,
    terms: [
      { president: "Herbert Hoover", termNumber: 1, startDate: "1929-03-04", endDate: "1933-03-03", congresses: [71, 72], wikipediaTitle: "Herbert_Hoover" }
    ]
  },
  {
    name: "Franklin D. Roosevelt",
    wikipediaTitle: "Franklin_D._Roosevelt",
    totalTerms: 4,
    terms: [
      { president: "Franklin D. Roosevelt", termNumber: 1, startDate: "1933-03-04", endDate: "1937-01-19", congresses: [73, 74], wikipediaTitle: "Franklin_D._Roosevelt" },
      { president: "Franklin D. Roosevelt", termNumber: 2, startDate: "1937-01-20", endDate: "1941-01-19", congresses: [75, 76], wikipediaTitle: "Franklin_D._Roosevelt" },
      { president: "Franklin D. Roosevelt", termNumber: 3, startDate: "1941-01-20", endDate: "1945-01-19", congresses: [77, 78], wikipediaTitle: "Franklin_D._Roosevelt" },
      { president: "Franklin D. Roosevelt", termNumber: 4, startDate: "1945-01-20", endDate: "1945-04-12", congresses: [79], wikipediaTitle: "Franklin_D._Roosevelt" }
    ]
  },
  {
    name: "Harry S. Truman",
    wikipediaTitle: "Harry_S._Truman",
    totalTerms: 2,
    terms: [
      { president: "Harry S. Truman", termNumber: 1, startDate: "1945-04-12", endDate: "1949-01-19", congresses: [79, 80], wikipediaTitle: "Harry_S._Truman" },
      { president: "Harry S. Truman", termNumber: 2, startDate: "1949-01-20", endDate: "1953-01-19", congresses: [81, 82], wikipediaTitle: "Harry_S._Truman" }
    ]
  },
  {
    name: "Dwight D. Eisenhower",
    wikipediaTitle: "Dwight_D._Eisenhower",
    totalTerms: 2,
    terms: [
      { president: "Dwight D. Eisenhower", termNumber: 1, startDate: "1953-01-20", endDate: "1957-01-19", congresses: [83, 84], wikipediaTitle: "Dwight_D._Eisenhower" },
      { president: "Dwight D. Eisenhower", termNumber: 2, startDate: "1957-01-20", endDate: "1961-01-19", congresses: [85, 86], wikipediaTitle: "Dwight_D._Eisenhower" }
    ]
  },
  {
    name: "John F. Kennedy",
    wikipediaTitle: "John_F._Kennedy",
    totalTerms: 1,
    terms: [
      { president: "John F. Kennedy", termNumber: 1, startDate: "1961-01-20", endDate: "1963-11-22", congresses: [87, 88], wikipediaTitle: "John_F._Kennedy" }
    ]
  },
  {
    name: "Lyndon B. Johnson",
    wikipediaTitle: "Lyndon_B._Johnson",
    totalTerms: 2,
    terms: [
      { president: "Lyndon B. Johnson", termNumber: 1, startDate: "1963-11-22", endDate: "1965-01-19", congresses: [88], wikipediaTitle: "Lyndon_B._Johnson" },
      { president: "Lyndon B. Johnson", termNumber: 2, startDate: "1965-01-20", endDate: "1969-01-19", congresses: [89, 90], wikipediaTitle: "Lyndon_B._Johnson" }
    ]
  },
  {
    name: "Richard Nixon",
    wikipediaTitle: "Richard_Nixon",
    totalTerms: 2,
    terms: [
      { president: "Richard Nixon", termNumber: 1, startDate: "1969-01-20", endDate: "1973-01-19", congresses: [91, 92], wikipediaTitle: "Richard_Nixon" },
      { president: "Richard Nixon", termNumber: 2, startDate: "1973-01-20", endDate: "1974-08-09", congresses: [93], wikipediaTitle: "Richard_Nixon" }
    ]
  },
  {
    name: "Gerald Ford",
    wikipediaTitle: "Gerald_Ford",
    totalTerms: 1,
    terms: [
      { president: "Gerald Ford", termNumber: 1, startDate: "1974-08-09", endDate: "1977-01-19", congresses: [93, 94], wikipediaTitle: "Gerald_Ford" }
    ]
  },
  {
    name: "Jimmy Carter",
    wikipediaTitle: "Jimmy_Carter",
    totalTerms: 1,
    terms: [
      { president: "Jimmy Carter", termNumber: 1, startDate: "1977-01-20", endDate: "1981-01-19", congresses: [95, 96], wikipediaTitle: "Jimmy_Carter" }
    ]
  },
  {
    name: "Ronald Reagan",
    wikipediaTitle: "Ronald_Reagan",
    totalTerms: 2,
    terms: [
      { president: "Ronald Reagan", termNumber: 1, startDate: "1981-01-20", endDate: "1985-01-19", congresses: [97, 98], wikipediaTitle: "Ronald_Reagan" },
      { president: "Ronald Reagan", termNumber: 2, startDate: "1985-01-20", endDate: "1989-01-19", congresses: [99, 100], wikipediaTitle: "Ronald_Reagan" }
    ]
  },
  {
    name: "George H. W. Bush",
    wikipediaTitle: "George_H._W._Bush",
    totalTerms: 1,
    terms: [
      { president: "George H. W. Bush", termNumber: 1, startDate: "1989-01-20", endDate: "1993-01-19", congresses: [101, 102], wikipediaTitle: "George_H._W._Bush" }
    ]
  },
  {
    name: "Bill Clinton",
    wikipediaTitle: "Bill_Clinton",
    totalTerms: 2,
    terms: [
      { president: "Bill Clinton", termNumber: 1, startDate: "1993-01-20", endDate: "1997-01-19", congresses: [103, 104], wikipediaTitle: "Bill_Clinton" },
      { president: "Bill Clinton", termNumber: 2, startDate: "1997-01-20", endDate: "2001-01-19", congresses: [105, 106], wikipediaTitle: "Bill_Clinton" }
    ]
  },
  {
    name: "George W. Bush",
    wikipediaTitle: "George_W._Bush",
    totalTerms: 2,
    terms: [
      { president: "George W. Bush", termNumber: 1, startDate: "2001-01-20", endDate: "2005-01-19", congresses: [107, 108], wikipediaTitle: "George_W._Bush" },
      { president: "George W. Bush", termNumber: 2, startDate: "2005-01-20", endDate: "2009-01-19", congresses: [109, 110], wikipediaTitle: "George_W._Bush" }
    ]
  },
  {
    name: "Barack Obama",
    wikipediaTitle: "Barack_Obama",
    totalTerms: 2,
    terms: [
      { president: "Barack Obama", termNumber: 1, startDate: "2009-01-20", endDate: "2013-01-19", congresses: [111, 112], wikipediaTitle: "Barack_Obama" },
      { president: "Barack Obama", termNumber: 2, startDate: "2013-01-20", endDate: "2017-01-19", congresses: [113, 114], wikipediaTitle: "Barack_Obama" }
    ]
  },
  {
    name: "Donald Trump",
    wikipediaTitle: "Donald_Trump",
    totalTerms: 2,
    terms: [
      { president: "Donald Trump", termNumber: 1, startDate: "2017-01-20", endDate: "2021-01-19", congresses: [115, 116], wikipediaTitle: "Donald_Trump" },
      { president: "Donald Trump", termNumber: 2, startDate: "2025-01-20", endDate: null, congresses: [119], wikipediaTitle: "Donald_Trump" }
    ]
  },
  {
    name: "Joe Biden",
    wikipediaTitle: "Joe_Biden",
    totalTerms: 1,
    terms: [
      { president: "Joe Biden", termNumber: 1, startDate: "2021-01-20", endDate: "2025-01-19", congresses: [117, 118], wikipediaTitle: "Joe_Biden" }
    ]
  }
];

/**
 * Get the term number for a president on a specific date
 */
export function getPresidentTerm(presidentName: string, date: string): PresidentTerm | null {
  const president = PRESIDENTS.find(p => p.name === presidentName);
  if (!president) return null;

  const targetDate = new Date(date);
  for (const term of president.terms) {
    const startDate = new Date(term.startDate);
    const endDate = term.endDate ? new Date(term.endDate) : new Date();

    if (targetDate >= startDate && targetDate <= endDate) {
      return term;
    }
  }

  return null;
}

/**
 * Get all president names for mapping purposes
 */
export function getAllPresidentNames(): string[] {
  return PRESIDENTS.map(p => p.name);
}

/**
 * Get Wikipedia title for a president
 */
export function getWikipediaTitle(presidentName: string): string | null {
  const president = PRESIDENTS.find(p => p.name === presidentName);
  return president?.wikipediaTitle || null;
}
