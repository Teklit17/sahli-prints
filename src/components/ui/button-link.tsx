import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  const className =
    variant === "primary"
      ? "inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-bold text-white transition hover:bg-[#c64226]"
      : "inline-flex h-11 items-center justify-center rounded-md border border-line bg-white px-5 text-sm font-bold transition hover:border-accent";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
