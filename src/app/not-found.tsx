import { ButtonLink } from "@/components/ui";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center">
        <LogoMark className="h-16 w-16" />
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-leaf">404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Page not found</h1>
        <p className="mt-4 text-body">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="outline" arrow={false}>Contact Us</ButtonLink>
        </div>
      </div>
    </section>
  );
}
