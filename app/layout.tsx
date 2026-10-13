import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";

import { Atmosphere } from "@/components/atmosphere";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORA — skin keeps the hours of light",
  description:
    "Five skincare formulas, each made for one hour of the day. Scroll from 04:00 to 22:00.",
};

export const viewport: Viewport = {
  themeColor: "#150f23",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        {/* Mounted ahead of the content so the smoother exists first. */}
        <SmoothScroll />
        <Atmosphere />
        <SiteHeader />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
