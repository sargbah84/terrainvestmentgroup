import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard, { ArticleImage } from "@/components/ArticleCard";
import { ClockIcon } from "@/components/icons";
import { formatDate, getAllSlugs, getArticle, getLatestArticles } from "@/lib/news";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

function clamp(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).trimEnd() + "…";
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };

  const description = clamp(article.metaDescription || article.excerpt);
  return {
    title: article.metaTitle || article.title,
    description,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `/news/${article.slug}`,
      publishedTime: article.publishedAt,
      ...(article.featuredImage ? { images: [article.featuredImage] } : {}),
    },
  };
}

export default async function ArticlePage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = (await getLatestArticles(4)).filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    ...(article.featuredImage ? { image: article.featuredImage } : {}),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="bg-paper">
        <header className="mx-auto max-w-3xl px-5 pt-14 text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-brand">News</Link>
          </nav>
          {article.categoryName && article.categorySlug && (
            <Link
              href={`/news?category=${article.categorySlug}`}
              className="mt-6 inline-block rounded-md bg-leaf-soft px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand"
            >
              {article.categoryName}
            </Link>
          )}
          <h1 className="mt-5 text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            {article.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted">
            <span className="font-semibold text-ink">{SITE_NAME}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {article.readingMinutes} min read
            </span>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-5xl px-5">
          <ArticleImage
            article={article}
            priority
            sizes="(min-width:1024px) 1024px, 100vw"
            className="aspect-[16/8] rounded-3xl"
          />
        </div>

        <div className="mx-auto max-w-3xl px-5 py-14">
          <div className="article" dangerouslySetInnerHTML={{ __html: article.content }} />
          {article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-ink">More News</h2>
              <Link href="/news" className="text-sm font-bold text-brand hover:underline">View all →</Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
