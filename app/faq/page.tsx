import type { Metadata } from "next";
import { getLandingPageData } from "@/lib/sanity";
import FAQPageClient from "./faq-client";

export const metadata: Metadata = {
  title: "FAQ - MASH",
  description: "Frequently asked questions about the MASH mushroom cultivation automation system",
};

export default async function FAQPage() {
  let data = null;
  try {
    data = await getLandingPageData();
  } catch {
    // Sanity fetch failed - FAQPageClient will use hardcoded defaults
  }

  return <FAQPageClient data={data} />;
}
