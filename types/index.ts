// Types for Federal Register API responses and Executive Orders

export interface ExecutiveOrder {
  document_number: string;
  title: string;
  abstract: string;
  publication_date: string;
  signing_date: string;
  president: string;
  type: string;
  html_url: string;
  pdf_url: string;
  citation?: string;
  // Enhanced metadata
  termNumber?: number; // Which presidential term (1st, 2nd, etc.)
  congressNumber?: number; // Which Congress was in session
  duringCongressionalSession?: boolean; // Was Congress in session?
  isLameDuck?: boolean; // Lame duck period?
  isLastTerm?: boolean; // President's final term?
}

export interface FederalRegisterDocument {
  document_number: string;
  title: string;
  abstract: string;
  publication_date: string;
  signing_date: string;
  type: string;
  html_url: string;
  pdf_url: string;
  citation?: string;
}

export interface FederalRegisterResponse {
  count: number;
  description: string;
  total_pages: number;
  next_page_url: string | null;
  previous_page_url: string | null;
  results: FederalRegisterDocument[];
}

export interface PresidentStats {
  name: string;
  count: number;
  startYear: number;
  endYear: number | null;
  // Enhanced stats
  imageUrl?: string; // Wikipedia portrait
  totalTerms?: number; // How many terms served
  firstTermCount?: number; // Orders in first term
  secondTermCount?: number; // Orders in second term
  duringSessionCount?: number; // Orders while Congress in session
  lameDuckCount?: number; // Orders during lame duck period
}

export interface YearlyStats {
  year: number;
  count: number;
}

export interface FilterOptions {
  president?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}
