import Link from "next/link";

const shopLinks = [
  ["Shop all", "/shop"],
  ["Customize order", "/customize"],
  ["Gallery", "/gallery"],
  ["Cart", "/cart"],
];

const serviceLinks = [
  ["DTF Printing", "/dtf-printing"],
  ["HTV Vinyl", "/htv-vinyl"],
  ["Sublimation", "/sublimation"],
  ["Custom Gifts", "/shop?category=Custom%20Gifts"],
];

const companyLinks = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["FAQ", "/faq"],
  ["Account", "/account"],
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-white/12 bg-white/8 p-7">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-accent text-sm font-black text-white">
              SP
            </span>
            <span>
              <span className="block text-2xl font-black leading-none">
                Sahli Prints
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Custom print studio
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300">
            Premium DTF shirts, HTV apparel, sublimation drinkware, hoodies,
            totes, and gift-ready print work for brands, teams, events, and
            personal projects.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/customize"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-black text-white transition hover:bg-[#c64226]"
            >
              Start custom order
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/18 px-5 text-sm font-black text-white transition hover:bg-white/10"
            >
              Shop products
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-4 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Sahli Prints. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="mailto:hello@sahliprints.com" className="hover:text-white">
              hello@sahliprints.com
            </a>
            <p>Mon-Fri, 9 AM-5 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5c0a9]">
        {title}
      </p>
      <div className="mt-4 grid gap-3 text-sm font-semibold text-zinc-300">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
