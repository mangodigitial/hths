import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help the High Street - from Weddel Swift",
  description: "Help the High Street campaign sets out to support you and ensure your customers always shop with you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vda0hvs.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
