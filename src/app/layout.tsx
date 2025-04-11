import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AppWrapper from "./components/AppWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Elevate Store",
  description: "Elevate Store – Premium skin and hair care products made with quality ingredients. Shop now for natural beauty essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased w-screen overflow-x-hidden`}
      >
        <AppWrapper>
          {
            children
          }
        </AppWrapper>
      </body>
    </html>
  );
}
