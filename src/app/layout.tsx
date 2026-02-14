import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google"; // Import Syne and Manrope
import "./globals.css";

// Configure Syne font (for Headings)
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

// Configure Manrope font (for Body)
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ilramdhan.dev | Creative Developer",
  description: "High-end Scrollytelling Personal Portfolio of Ilramdhan, a Creative Developer specializing in Next.js, Motion, and Web Interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${manrope.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
