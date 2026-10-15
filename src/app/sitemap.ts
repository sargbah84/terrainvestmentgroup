import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/news";
import { SECTORS, SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/our-work", "/impact", "/team", "/news", "/contact"];
  const sectors = SECTORS.map((s) => `/our-work/${s.slug}`);
  const news = (await getAllSlugs()).map((slug) => `/news/${slug}`);
  return [...pages, ...sectors, ...news].map((path) => ({ url: `${SITE_URL}${path}` }));
}
