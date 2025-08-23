import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "realtor",
  description:
    "Struggling to find a home in [Your City]'s competitive market? As your dedicated buyer's agent, I provide exclusive listings, expert negotiation, and seamless support from search to closing",
  keywords: [
    "realtor",
    "real estate agent",
    "real estate agent",
    "real estate agency",
    "real estate company",
    "",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dm_sans.className} antialiased bg-[#f9f9f9]`}>{children}</body>
    </html>
  );
}
