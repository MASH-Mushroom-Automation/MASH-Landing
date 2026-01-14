import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MASH - Mushroom Automation System Hub",
  description: "Professional mushroom cultivation automation platform with advanced monitoring, climate control, and mobile app integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
