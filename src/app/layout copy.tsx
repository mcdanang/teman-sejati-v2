import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { TokenProvider } from "@/components/TokenProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import NotFound from "./not-found";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wrotels | AI-Powered IELTS Writing Test Simulation Platform",
  description: "AI-powered IELTS writing test simulation platform.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return (
      <html lang="en">
        <body className={`${openSans.className}`}>
          <NotFound />
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon/favicon-16x16.png"
      />
      <link rel="icon" type="image/x-icon" href="/images/favicon/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />

      <body className={`${openSans.className}`}>
        <NextIntlClientProvider>
          <GoogleAnalytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <TokenProvider>
              <main>{children}</main>
              <Toaster />
            </TokenProvider>
          </ThemeProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
