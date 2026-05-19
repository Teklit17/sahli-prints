import type { Product, Review } from "@/src/types";

export const products: Product[] = [
  {
    id: "prod_dtf_classic",
    slug: "classic-dtf-shirt",
    name: "Classic DTF Shirt",
    description:
      "Soft cotton tee with vibrant direct-to-film prints for detailed artwork, logos, and event drops.",
    price: 28,
    category: "DTF Shirts",
    printTypes: ["DTF"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "White", "Sand", "Forest", "Charcoal"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "prod_htv_crew",
    slug: "htv-vinyl-crewneck",
    name: "HTV Vinyl Crewneck",
    description:
      "Clean vinyl lettering and simple graphics on a cozy midweight crewneck.",
    price: 48,
    category: "HTV Vinyl",
    printTypes: ["HTV"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Grey", "Navy", "Cream"],
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "prod_sublimation_tumbler",
    slug: "sublimation-tumbler",
    name: "Sublimation Tumbler",
    description:
      "Full-wrap drinkware for photo collages, brand artwork, teacher gifts, and bridal parties.",
    price: 34,
    category: "Sublimation",
    printTypes: ["Sublimation"],
    sizes: ["20 oz", "30 oz"],
    colors: ["White", "Stainless"],
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "prod_premium_hoodie",
    slug: "premium-print-hoodie",
    name: "Premium Print Hoodie",
    description:
      "Heavyweight fleece hoodie with front, back, or sleeve print placement.",
    price: 64,
    category: "Hoodies",
    printTypes: ["DTF", "HTV"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "Bone", "Maroon", "Olive"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prod_canvas_tote",
    slug: "custom-canvas-tote",
    name: "Custom Canvas Tote",
    description:
      "Durable natural canvas bag for shops, markets, wedding favors, and everyday carry.",
    price: 22,
    category: "Tote Bags",
    printTypes: ["DTF", "HTV"],
    sizes: ["Standard"],
    colors: ["Natural", "Black"],
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prod_gift_bundle",
    slug: "personalized-gift-bundle",
    name: "Personalized Gift Bundle",
    description:
      "Curated custom gift set with matching apparel, mug, and tote options.",
    price: 76,
    category: "Custom Gifts",
    printTypes: ["DTF", "Sublimation", "HTV"],
    sizes: ["Starter", "Signature", "Deluxe"],
    colors: ["Mixed"],
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80",
  },
];

export const reviews: Review[] = [
  {
    id: "review_1",
    author: "Maya R.",
    quote:
      "The shirts for our pop-up looked sharp, washed well, and arrived before our event.",
    rating: 5,
  },
  {
    id: "review_2",
    author: "Jordan P.",
    quote:
      "Sahli helped clean up my logo and made the hoodie print placement perfect.",
    rating: 5,
  },
  {
    id: "review_3",
    author: "Ari L.",
    quote:
      "The tumblers were the easiest custom gifts I have ordered for a team.",
    rating: 5,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
