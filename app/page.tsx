import type { Metadata } from "next";
import { CustomerTypes } from "@/components/home/customer-types";
import { CommunityPartners } from "@/components/home/community-partners";
import { FinalCta } from "@/components/home/final-cta";
import { GoogleReviews } from "@/components/home/google-reviews";
import { Hero } from "@/components/home/hero";
import { LocalReferences } from "@/components/home/local-references";
import { PhilIntroduction } from "@/components/home/phil-introduction";
import { RepairProcess } from "@/components/home/repair-process";
import { ServicesPreview } from "@/components/home/services-preview";
import { ShopInformation } from "@/components/home/shop-information";
import { getLocalBusinessSchema } from "@/lib/local-business-schema";

export const metadata: Metadata = {
  title: "Phil Multi-Services | Réparation électroménager à Saint-Amand-les-Eaux",
  description:
    "Parlez directement à Phil pour la réparation d’électroménager, les pièces détachées, la location et le matériel reconditionné à Saint-Amand-les-Eaux.",
};

export default function Home() {
  const jsonLd = getLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <ServicesPreview />
      <PhilIntroduction />
      <CustomerTypes />
      <LocalReferences />
      <CommunityPartners />
      <RepairProcess />
      <ShopInformation />
      <GoogleReviews />
      <FinalCta />
    </>
  );
}
