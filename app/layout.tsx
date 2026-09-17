import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import FloatingNav from "@/components/FloatingNav";
import { getLandingPageDataCached } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "MASH - Mushroom Automation System Hub",
  description: "Professional mushroom cultivation automation platform with advanced monitoring, climate control, and mobile app integration.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let landingData = null;
  try {
    landingData = await getLandingPageDataCached();
  } catch {
    // Fallback: FloatingNav renders with defaults when data is unavailable
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <FloatingNav data={landingData} />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
