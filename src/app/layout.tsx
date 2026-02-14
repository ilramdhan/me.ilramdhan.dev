import type { Metadata, Viewport } from "next";
import { Syne, Manrope } from "next/font/google";
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

const siteUrl = "https://ilramdhan.dev";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ilramdhan.dev — Creative Fullstack Developer",
    template: "%s | Ilramdhan.dev",
  },
  description:
    "High-end Scrollytelling Personal Portfolio of Ilramdhan, a Creative Fullstack Developer specializing in Next.js, Motion, and immersive Web Interactions.",
  keywords: [
    "Ilramdhan",
    "Creative Developer",
    "Fullstack Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Web Developer Indonesia",
    "Motion Design",
    "Scrollytelling",
  ],
  authors: [{ name: "Ilramdhan", url: siteUrl }],
  creator: "Ilramdhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ilramdhan.dev",
    title: "Ilramdhan.dev — Creative Fullstack Developer",
    description:
      "High-end Scrollytelling Personal Portfolio. Specializing in Next.js, Motion, and immersive Web Interactions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ilramdhan.dev — Creative Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilramdhan.dev — Creative Fullstack Developer",
    description:
      "High-end Scrollytelling Personal Portfolio. Specializing in Next.js, Motion, and immersive Web Interactions.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
