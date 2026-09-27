import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { SiteMenu } from "@/components/site-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const description =
  "Mexican girl with gothic alternative vibes. A gothic corner for links, gaming, and sets.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Kittygot",
    template: "%s · Kittygot",
  },
  description,
  applicationName: "Kittygot",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kittygot",
    title: "Kittygot",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kittygot",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full font-body text-ink antialiased">
        <ThemeProvider>
          <header className="sticky top-0 z-40">
            <div className="flex w-full items-stretch border-b border-line bg-raised/90 backdrop-blur-sm">
              <SiteMenu />
              <ThemeToggle className="ml-auto hidden shrink-0 border-l border-line md:flex" />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
