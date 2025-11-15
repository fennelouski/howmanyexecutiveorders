/**
 * Congressional session tracking for executive order analysis
 *
 * Congress typically meets from early January through late July/August,
 * with occasional lame duck sessions in November-December after elections.
 */

export interface CongressionalSession {
  congress: number;
  session: number;
  startDate: string;
  endDate: string;
}

/**
 * Typical congressional calendar patterns:
 * - Regular session: January - July/August
 * - Lame duck: November - December (election years)
 * - Congress numbers: odd years start new Congress
 */

/**
 * Determine if a date falls during a typical congressional session
 * This uses historical patterns since complete session data isn't available via API
 */
export function isCongressInSession(date: string): boolean {
  const d = new Date(date);
  const month = d.getMonth(); // 0-indexed (0 = January)
  const day = d.getDate();

  // Congress typically in session:
  // - January 3 through late July/early August
  // - September (sometimes)
  // - November-December in lame duck years (even years after elections)

  // January through July: Usually in session
  if (month >= 0 && month <= 6) {
    // Except early January before the 3rd
    if (month === 0 && day < 3) {
      return false;
    }
    return true;
  }

  // August: Usually in recess
  if (month === 7) {
    return false;
  }

  // September: Sometimes in session
  if (month === 8) {
    return true; // Simplified - often in session
  }

  // October: Usually preparing for elections or in recess
  if (month === 9) {
    return false;
  }

  // November-December: Check for lame duck session
  if (month >= 10) {
    const year = d.getFullYear();
    const isEvenYear = year % 2 === 0; // Election years

    // Lame duck sessions typically occur in even years after elections
    // Usually from mid-November to late December
    if (isEvenYear) {
      // After Election Day (first Tuesday after first Monday in November)
      const electionDay = getElectionDay(year);
      if (d >= electionDay) {
        return true; // Likely lame duck session
      }
    }
  }

  return false;
}

/**
 * Determine if a date falls during a lame duck period
 * (After an election but before the new Congress/President takes office)
 */
export function isLameDuckPeriod(date: string, presidentName: string): boolean {
  const d = new Date(date);
  const year = d.getFullYear();
  const isEvenYear = year % 2 === 0;

  // Lame duck sessions occur in even years after elections
  if (!isEvenYear) {
    return false;
  }

  // Check if after election day
  const electionDay = getElectionDay(year);
  if (d < electionDay) {
    return false;
  }

  // Lame duck period: after election through January 3 (or Jan 20 for presidents)
  const nextYear = year + 1;

  // Presidential lame duck: after election through Jan 20
  // Only in years divisible by 4 (presidential elections)
  if (year % 4 === 0) {
    const inaugurationDay = new Date(nextYear, 0, 20); // Jan 20
    return d >= electionDay && d < inaugurationDay;
  }

  // Congressional lame duck: after election through Jan 3
  const newCongressDay = new Date(nextYear, 0, 3); // Jan 3
  return d >= electionDay && d < newCongressDay;
}

/**
 * Calculate Election Day for a given year
 * (First Tuesday after the first Monday in November)
 */
function getElectionDay(year: number): Date {
  // Start with November 1st
  const nov1 = new Date(year, 10, 1); // Month 10 = November

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = nov1.getDay();

  // First Monday of November
  let firstMonday: number;
  if (dayOfWeek === 0) { // Sunday
    firstMonday = 2;
  } else if (dayOfWeek === 1) { // Monday
    firstMonday = 1;
  } else {
    firstMonday = 8 - dayOfWeek + 1;
  }

  // First Tuesday after first Monday
  const electionDay = firstMonday + 1;

  return new Date(year, 10, electionDay);
}

/**
 * Get the Congress number for a given date
 * Congress numbers start from 1st Congress (1789-1791)
 * Each Congress lasts 2 years, starting in odd years since 1935
 */
export function getCongressNumber(date: string): number {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();

  // Before 1935, Congress started in March
  // After 1935 (20th Amendment), Congress starts Jan 3 of odd years

  if (year < 1935) {
    // Pre-20th Amendment: Congress started March 4
    if (month < 2) { // Before March (month 2)
      return Math.floor((year - 1789) / 2) + 1;
    } else {
      return Math.floor((year - 1789) / 2) + 1;
    }
  } else {
    // Post-20th Amendment: Congress starts Jan 3 of odd years
    let congressYear = year;
    if (year % 2 === 0) {
      // Even year - Congress started previous year
      congressYear = year - 1;
    }

    // Calculate from 74th Congress (1935)
    const congressesSince1935 = (congressYear - 1935) / 2;
    return 74 + congressesSince1935;
  }
}

/**
 * Determine if a president was in their final term when signing an order
 * Requires knowing if they were elected again after this order
 */
export function isLastTermOrder(date: string, presidentName: string, presidentTermNumber: number, presidentTotalTerms: number): boolean {
  // If this is their last term number, then yes
  if (presidentTermNumber === presidentTotalTerms) {
    return true;
  }

  return false;
}

/**
 * Get contextual information about when an executive order was signed
 */
export interface OrderContext {
  congressNumber: number;
  inSession: boolean;
  isLameDuck: boolean;
  termNumber: number;
  isLastTerm: boolean;
}

export function getOrderContext(
  signingDate: string,
  presidentName: string,
  termNumber: number,
  totalTerms: number
): OrderContext {
  return {
    congressNumber: getCongressNumber(signingDate),
    inSession: isCongressInSession(signingDate),
    isLameDuck: isLameDuckPeriod(signingDate, presidentName),
    termNumber,
    isLastTerm: isLastTermOrder(signingDate, presidentName, termNumber, totalTerms)
  };
}
