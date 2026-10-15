import Image from "next/image";
import type { TeamMember } from "@/lib/site";

function initials(name: string) {
  return name
    .replace(/^(Pst\.|Dr\.|Mr\.|Mrs\.)\s*/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !w.endsWith("."))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/** Circular headshot + name + role. Falls back to initials when no photo. */
export default function TeamCard({
  member,
  size = "md",
}: {
  member: TeamMember;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-40 w-40" : "h-[132px] w-[132px] sm:h-36 sm:w-36";
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`relative ${dim} overflow-hidden rounded-full bg-leaf-soft ring-4 ring-white shadow-[0_6px_20px_rgba(12,40,41,0.12)]`}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-leaf to-brand text-3xl font-extrabold text-white">
            {initials(member.name)}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm font-bold text-ink">{member.name}</p>
      <p className="mt-1 text-xs text-muted">{member.role}</p>
    </div>
  );
}
