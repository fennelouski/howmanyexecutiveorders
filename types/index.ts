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
