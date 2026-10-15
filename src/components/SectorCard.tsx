import Image from "next/image";
import Link from "next/link";
import type { Sector } from "@/lib/site";
import { ArrowRightIcon, Icon } from "./icons";

export default function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      href={`/our-work/${sector.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_2px_10px_rgba(12,40,41,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(12,40,41,0.12)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={sector.image}
          alt={sector.title}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <Icon name={sector.icon} className="h-7 w-7 text-brand" />
        <h3 className="mt-3 text-[17px] font-bold leading-snug text-ink">{sector.title}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-body">{sector.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
          Learn More
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
