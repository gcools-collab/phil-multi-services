import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { business } from "@/data/business";
import { siteUrl } from "@/data/site";
import "./globals.css";
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: "Phil Multi-Services | Réparation électroménager à Saint-Amand-les-Eaux", template: "%s | Phil Multi-Services" }, description: "Phil Multi-Services vous accompagne à Saint-Amand-les-Eaux pour la réparation d’électroménager, les pièces détachées, la location de matériel et le matériel reconditionné.", openGraph: { type: "website", locale: "fr_FR", siteName: business.businessName, title: "Phil Multi-Services | Réparation électroménager à Saint-Amand-les-Eaux", description: "Réparation, pièces détachées, location et matériel reconditionné à Saint-Amand-les-Eaux." }, twitter: { card: "summary", title: "Phil Multi-Services", description: "Votre artisan de proximité à Saint-Amand-les-Eaux." } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr" className={geist.variable}><body><a className="skip-link" href="#main-content">Aller au contenu</a><Header /><main id="main-content">{children}</main><Footer /><MobileCtaBar /></body></html>; }
