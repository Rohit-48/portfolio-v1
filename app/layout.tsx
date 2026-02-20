import type { Metadata } from "next";
import { DM_Mono, Instrument_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const BASE_URL = "https://rohit.builds";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rohit | Software Developer",
    template: "%s | Rohit",
  },
  description:
    "Software developer and CS student. Better at problem solving and building systems with no DX overhead.",
  keywords: [
    "Rohit",
    "Portfolio",
    "software developer",
    "full stack developer",
    "Next.js",
    "TypeScript",
    "Rust",
    "React",
    "web development",
  ],
  authors: [{ name: "Rohit" }],
  creator: "Rohit",
  icons: {
    icon: "/my-notion-face-transparent.png",
    shortcut: "/my-notion-face-transparent.png",
    apple: "/my-notion-face-transparent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Rohit's Portfolio",
    title: "Rohit | Software Developer",
    description:
      "Software developer and CS student. Better at problem solving and building systems with no DX overhead.",
    images: [
      {
        url: `${BASE_URL}/avatar.png`,
        width: 1200,
        height: 630,
        alt: "Rohit - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit | Software Developer",
    description:
      "Software developer and CS student. Better at problem solving and building systems with no DX overhead.",
    creator: "@rohitcpp",
    images: `${BASE_URL}/avatar.png`,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": `${BASE_URL}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmMono.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
