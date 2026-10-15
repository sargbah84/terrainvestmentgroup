/**
 * News data layer — backed by the SeoJama headless API (same integration as
 * terramarketgroup.com's blog).
 *
 * Posts are pulled from a single SeoJama workspace via a read-only,
 * key-authenticated endpoint. Credentials live in server-side env vars. The raw
 * API shape is adapted into the `Article` type the UI consumes.
 *
 * API reference (per post): id, title, slug, content (HTML), excerpt,
 * featured_image_url, meta_title, meta_description, focus_keyword, post_type,
 * reading_time, tags[], category, category_name, published_at, updated_at.
 */

const API_BASE = process.env.SEOJAMA_API_BASE ?? "https://seojama.com/api/v1";
const WORKSPACE_ID = process.env.SEOJAMA_WORKSPACE_ID ?? "";
const API_KEY = process.env.SEOJAMA_API_KEY ?? "";

/** Revalidate cached responses hourly. */
const REVALIDATE_SECONDS = 3600;

export const PAGE_SIZE = 9;

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Full HTML body — only used on the detail page. */
  content: string;
  categoryName: string | null;
  categorySlug: string | null;
  tags: string[];
  featuredImage: string | null;
  /** ISO date string. */
  publishedAt: string;
  readingMinutes: number;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
}

interface ApiPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_time: number | null;
  tags: string[] | null;
  category: string | null;
  category_name: string | null;
  published_at: string | null;
}

interface ApiPage {
  data: ApiPost[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

function mapPost(p: ApiPost): Article {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    categoryName: p.category_name,
    categorySlug: p.category,
    tags: p.tags ?? [],
    featuredImage: p.featured_image_url,
    publishedAt: p.published_at ?? new Date(0).toISOString(),
    readingMinutes: p.reading_time ?? 5,
    metaTitle: p.meta_title,
    metaDescription: p.meta_description,
  };
}

export function newsConfigured(): boolean {
  return Boolean(WORKSPACE_ID && API_KEY);
}

/** Fetch one page from the API. Returns null on any failure (kept resilient). */
async function fetchPage(page: number, perPage: number): Promise<ApiPage | null> {
  if (!newsConfigured()) {
    console.warn("[news] SEOJAMA_WORKSPACE_ID / SEOJAMA_API_KEY not set.");
    return null;
  }

  const url = `${API_BASE}/workspaces/${WORKSPACE_ID}/posts?per_page=${perPage}&page=${page}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["news"] },
    });
    if (!res.ok) {
      console.error(`[news] API ${res.status} for ${url}`);
      return null;
    }
    return (await res.json()) as ApiPage;
  } catch (err) {
    console.error("[news] fetch failed:", err);
    return null;
  }
}

/** Fetch every published post (the workspace is small; one or few pages). */
async function fetchAll(): Promise<Article[]> {
  const first = await fetchPage(1, 100);
  if (!first) return [];

  const posts = [...first.data];
  for (let page = 2; page <= first.last_page; page++) {
    const next = await fetchPage(page, 100);
    if (next) posts.push(...next.data);
  }
  return posts.map(mapPost);
}

export async function getArticles(options?: {
  page?: number;
  category?: string;
}): Promise<Paginated<Article>> {
  const page = Math.max(1, options?.page ?? 1);
  const all = await fetchAll();

  const filtered = options?.category
    ? all.filter(
        (p) =>
          p.categorySlug === options.category ||
          p.categoryName === options.category
      )
    : all;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  return { items: filtered.slice(start, start + PAGE_SIZE), page, totalPages, total };
}

export async function getLatestArticles(count: number): Promise<Article[]> {
  return (await fetchAll()).slice(0, count);
}

export async function getArticle(slug: string): Promise<Article | null> {
  return (await fetchAll()).find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  return (await fetchAll()).map((p) => p.slug);
}

/** Distinct categories present in published posts, for the filter bar. */
export async function getCategories(): Promise<{ name: string; slug: string }[]> {
  const seen = new Map<string, string>();
  for (const p of await fetchAll()) {
    if (p.categoryName && p.categorySlug && !seen.has(p.categorySlug)) {
      seen.set(p.categorySlug, p.categoryName);
    }
  }
  return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
