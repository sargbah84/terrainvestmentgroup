import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard, { ArticleImage } from "@/components/ArticleCard";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";
import { formatDate, getArticles, getCategories } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "The latest news, updates, and stories from Terra Investment Group and the communities we serve across Liberia.",
  alternates: { canonical: "/news" },
};

function pageHref(page: number, category?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/news?${qs}` : "/news";
}

export default async function NewsPage(props: PageProps<"/news">) {
  const sp = await props.searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const page = Math.max(1, Number(sp.page) || 1);

  const [{ items, totalPages, total }, categories] = await Promise.all([
    getArticles({ page, category }),
    getCategories(),
  ]);

  // Lead story only on the unfiltered first page.
  const showFeatured = page === 1 && !category && items.length > 0;
  const featured = showFeatured ? items[0] : null;
  const rest = showFeatured ? items.slice(1) : items;

  return (
    <>
      <PageHero
        eyebrow="News"
        title="News & Updates"
        lead="Stories, announcements, and progress from Terra Investment Group and the communities we work with."
        image="/images/cocoa-seedlings.jpg"
        crumbs={[{ label: "News" }]}
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          {categories.length > 0 && (
            <nav aria-label="News categories" className="mb-10 flex flex-wrap gap-2">
              <Link
                href="/news"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  !category ? "bg-brand text-white" : "border border-line bg-white text-ink hover:border-brand"
                }`}
              >
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={pageHref(1, c.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    category === c.slug ? "bg-brand text-white" : "border border-line bg-white text-ink hover:border-brand"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          )}

          {total === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
              <p className="text-xl font-bold text-ink">No news yet</p>
              <p className="mx-auto mt-2 max-w-md text-body">
                We&rsquo;re preparing our first stories. Check back soon for updates from the field.
              </p>
            </div>
          ) : (
            <>
              {featured && (
                <Link
                  href={`/news/${featured.slug}`}
                  className="group mb-12 grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
                >
                  <ArticleImage
                    article={featured}
                    priority
                    sizes="(min-width:1024px) 640px, 100vw"
                    className="aspect-[16/10] lg:aspect-auto lg:min-h-[380px]"
                  />
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <span className="eyebrow">Latest Story</span>
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight text-ink group-hover:text-brand sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 line-clamp-4 leading-relaxed text-body">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                      <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                      <span className="inline-flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {featured.readingMinutes} min read
                      </span>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                      Read the story <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              )}

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <Link
                      key={n}
                      href={pageHref(n, category)}
                      aria-current={n === page ? "page" : undefined}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                        n === page ? "bg-brand text-white" : "border border-line bg-white text-ink hover:border-brand"
                      }`}
                    >
                      {n}
                    </Link>
                  ))}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
