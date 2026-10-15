import type { SectorStatus } from "@/lib/site";

const STYLES: Record<SectorStatus, string> = {
  Active: "bg-leaf-soft text-brand",
  Growing: "bg-[#e6f0fb] text-[#1d5fa8]",
  "Coming Soon": "bg-[#fdf3d6] text-[#8a6410]",
};

export default function StatusBadge({ status }: { status: SectorStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${STYLES[status]}`}>
      {status}
    </span>
  );
}
