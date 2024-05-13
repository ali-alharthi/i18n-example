import "@/styles/globals.css"
import { Viewport } from "next"
import { getMessages, getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from 'next-intl';

import { cn, dir } from "@/lib/util";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata() {

  const t = await getTranslations('common');

  return {
    title: {
      default: t('title'),
      template: `%s • ${t('title')}`,
    },
    icons: {
      icon: "/favicon.ico",
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {

  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster dir={dir(locale)} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}