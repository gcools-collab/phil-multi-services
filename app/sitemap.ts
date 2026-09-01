import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/services", "/a-propos", "/contact"].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .8 })); }
