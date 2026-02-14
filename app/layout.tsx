import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import FooterServer from "@/components/footer.server";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://instagram-unfollow-trackers.vercel.app/"; // fallback aman (ubah kalau mau)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Instagram Unfollowers Tracker",
    template: "%s | Instagram Unfollowers Tracker",
  },
  description:
    "Upload Instagram followers & following JSON files and detect accounts that don’t follow you back. Runs locally in your browser.",
  alternates: { canonical: "/" },
  icons: { icon: "/ig-favicon.ico" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Instagram Unfollowers Tracker",
    description:
      "Detect accounts that don’t follow you back using your Instagram data files. Runs locally in your browser.",
    siteName: "Instagram Unfollowers Tracker",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OG Image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Unfollowers Tracker",
    description:
      "Detect accounts that don’t follow you back using your Instagram data files. Runs locally in your browser.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSoftwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Instagram Unfollowers Tracker",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "Upload Instagram followers & following JSON files and detect accounts that don’t follow you back. Runs locally in your browser.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  // ✅ Tambahan: WebSite schema untuk bantu Google “site name”
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Instagram Unfollowers Tracker",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ig-favicon.ico" sizes="any" />

        {/* SoftwareApplication schema */}
        <Script
          id="jsonld-softwareapp"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSoftwareApp),
          }}
        />

        {/* ✅ WebSite schema (Site Name) */}
        <Script
          id="jsonld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite),
          }}
        />
      </head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <header className="container mx-auto p-4">
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </header>

            {children}
          </div>

          <FooterServer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
