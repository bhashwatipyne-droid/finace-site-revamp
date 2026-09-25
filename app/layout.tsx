import type { Metadata, Viewport } from "next";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow/800.css";
import "@fontsource/barlow/900.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./globals.css";
import Effects from "@/components/Effects";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://finace.co"),
  title: {
    default: "FinAce | Finance-first marketing agency",
    template: "%s | FinAce",
  },
  description:
    "FinAce is a BFSI-focused marketing agency combining domain expertise and creativity to build communications that drive impact.",
  icons: { icon: "/brand/finace-icon.svg" },
  openGraph: {
    type: "website",
    siteName: "FinAce",
    title: "FinAce | Finance is Complex, Marketing it Shouldn't be.",
    description:
      "A finance-first marketing agency for mutual funds, insurers, banks and distributors.",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Effects />
        {children}
      </body>
    </html>
  );
}
