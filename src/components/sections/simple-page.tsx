import type { ReactNode } from "react";

type SimplePageProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function SimplePage({ eyebrow, title, children }: SimplePageProps) {
  return (
    <section className="container-shell py-12">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
        <div className="mt-6 text-lg leading-8 text-muted">{children}</div>
      </div>
    </section>
  );
}
