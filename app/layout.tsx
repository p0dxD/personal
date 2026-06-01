import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jose R. — Podoi Tech LLC",
  description: "Building AI tools that solve everyday problems. Founder of Podoi Tech LLC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
      <Script
        async
        src="https://analytics.jobsentry.net/script.js"
        data-website-id="25ea0a7e-6445-495e-bed5-1695e23425dc"
      />
    </html>
  );
}
