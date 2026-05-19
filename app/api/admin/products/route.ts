import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth/session";
import { getDatabase } from "@/src/lib/mongodb";
import type { PrintType, ProductCategory } from "@/src/types";

export const runtime = "nodejs";

const categories: ProductCategory[] = [
  "DTF Shirts",
  "HTV Vinyl",
  "Sublimation",
  "Hoodies",
  "Tote Bags",
  "Custom Gifts",
];

const printTypes: PrintType[] = ["DTF", "HTV", "Sublimation", "Embroidery"];

type ProductPayload = {
  name?: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  printTypes?: PrintType[];
  sizes?: string[];
  colors?: string[];
  image?: string;
  inventory?: number;
  active?: boolean;
  featured?: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      response: NextResponse.json({ error: "Login required." }, { status: 401 }),
      user: null,
    };
  }

  if (currentUser.role !== "admin") {
    return {
      response: NextResponse.json({ error: "Admin role required." }, { status: 403 }),
      user: null,
    };
  }

  return { response: null, user: currentUser };
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const db = await getDatabase();
  const products = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({
    products: products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category,
      printTypes: product.printTypes ?? [],
      sizes: product.sizes ?? [],
      colors: product.colors ?? [],
      image: product.image,
      inventory: product.inventory ?? 0,
      active: product.active !== false,
      featured: Boolean(product.featured),
      createdAt: product.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const payload = (await request.json()) as ProductPayload;
  const name = payload.name?.trim() ?? "";
  const description = payload.description?.trim() ?? "";
  const price = Number(payload.price);
  const category = payload.category;
  const image = payload.image?.trim() ?? "";
  const selectedPrintTypes = (payload.printTypes ?? []).filter((item) =>
    printTypes.includes(item),
  );
  const sizes = (payload.sizes ?? []).map((item) => item.trim()).filter(Boolean);
  const colors = (payload.colors ?? []).map((item) => item.trim()).filter(Boolean);

  if (!name || !description || !image) {
    return NextResponse.json(
      { error: "Name, description, and image URL are required." },
      { status: 400 },
    );
  }

  if (!category || !categories.includes(category)) {
    return NextResponse.json({ error: "Valid category is required." }, { status: 400 });
  }

  if (!Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ error: "Valid price is required." }, { status: 400 });
  }

  if (!selectedPrintTypes.length) {
    return NextResponse.json(
      { error: "Choose at least one print type." },
      { status: 400 },
    );
  }

  const now = new Date();
  const db = await getDatabase();
  const collection = db.collection("products");
  await collection.createIndex({ slug: 1 }, { unique: true });

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;

  while (await collection.findOne({ slug }, { projection: { _id: 1 } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const result = await collection.insertOne({
    name,
    slug,
    description,
    price,
    category,
    printTypes: selectedPrintTypes,
    sizes: sizes.length ? sizes : ["Standard"],
    colors: colors.length ? colors : ["Default"],
    image,
    inventory: Number(payload.inventory ?? 0),
    active: payload.active !== false,
    featured: Boolean(payload.featured),
    createdBy: guard.user?.id,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json(
    {
      product: {
        id: result.insertedId.toString(),
        name,
        slug,
      },
    },
    { status: 201 },
  );
}
