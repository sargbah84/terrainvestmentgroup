import Image from "next/image";
import Link from "next/link";
import { formatDate, type Article } from "@/lib/news";
import { LogoMark } from "./Logo";

/** Featured image, or a branded placeholder when the post has none. */
export function ArticleImage({
  article,
  sizes,
  priority = false,
  className = "",
}: {
  article: Article;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-forest to-brand ${className}`}>
      {article.featuredImage ? (
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LogoMark className="h-16 w-16 opacity-60" light />
        </div>
      )}
    </div>
  );
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <ArticleImage
        article={article}
        sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
        className="aspect-[16/10]"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          {article.categoryName && (
            <span className="rounded-md bg-leaf-soft px-2 py-1 font-bold uppercase tracking-wide text-brand">
              {article.categoryName}
            </span>
          )}
          <time dateTime={article.publishedAt} className="text-muted">
            {formatDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-brand">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-body">{article.excerpt}</p>
        <span className="mt-4 text-sm font-bold text-brand">Read more →</span>
      </div>
    </Link>
  );
}
