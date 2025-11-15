import type { Metadata } from "next";
import "./globals.css";
import { DisplayOptionsProvider } from "@/contexts/DisplayOptionsContext";

export const metadata: Metadata = {
  title: "How Many Executive Orders? | U.S. Presidential Executive Orders Tracker",
  description: "Track and explore U.S. Presidential Executive Orders from the Federal Register. View statistics, search orders, and analyze trends across different administrations.",
  keywords: ["executive orders", "presidential", "federal register", "US government", "politics"],
  authors: [{ name: "Executive Orders Tracker" }],
  openGraph: {
    title: "How Many Executive Orders?",
    description: "Track U.S. Presidential Executive Orders from the Federal Register",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DisplayOptionsProvider>
          {children}
        </DisplayOptionsProvider>
      </body>
    </html>
  );
}
