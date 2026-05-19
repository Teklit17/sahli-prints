import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/src/components/product/add-to-cart-button";
import { getProductBySlug, products } from "@/src/lib/data";
import { formatCurrency } from "@/src/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product?.name ?? "Product",
    description: product?.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="container-shell grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
      <Image
        src={product.image}
        alt={product.name}
        width={900}
        height={675}
        className="aspect-[4/3] w-full rounded-lg object-cover"
      />
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          {product.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold">{product.name}</h1>
        <p className="mt-4 text-2xl font-black">
          {formatCurrency(product.price)}
        </p>
        <p className="mt-5 leading-8 text-muted">{product.description}</p>
        <div className="mt-8 grid gap-5">
          <div>
            <p className="text-sm font-bold">Available sizes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span key={size} className="rounded-md border border-line px-3 py-2 text-sm">
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">Colors</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span key={color} className="rounded-md border border-line px-3 py-2 text-sm">
                  {color}
                </span>
              ))}
            </div>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
