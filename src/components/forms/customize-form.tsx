"use client";

import { useState } from "react";
import { useCart } from "@/src/components/cart/cart-provider";
import { products } from "@/src/lib/data";
import { formatCurrency } from "@/src/lib/utils";

const baseProduct = products[0];

const colorValues: Record<string, string> = {
  Black: "bg-[#111111]",
  White: "bg-white",
  Sand: "bg-[#d8c3a5]",
  Forest: "bg-[#244331]",
  Charcoal: "bg-[#3b3b3b]",
};

export function CustomizeForm() {
  const { addItem } = useCart();
  const [customText, setCustomText] = useState("");
  const [size, setSize] = useState(baseProduct.sizes[2]);
  const [color, setColor] = useState(baseProduct.colors[0]);
  const [printType, setPrintType] = useState(baseProduct.printTypes[0]);
  const [preview, setPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <form
        className="grid gap-6 rounded-lg border border-line bg-white p-5 shadow-[0_18px_60px_rgba(17,17,17,0.06)] sm:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          addItem(baseProduct, {
            customText,
            size,
            color,
            printType,
            uploadUrl: preview ?? undefined,
          });
          setSaved(true);
        }}
      >
        <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Order details
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Customize a {baseProduct.name}
            </h2>
            <p className="mt-2 max-w-xl leading-7 text-muted">
              Start with our classic DTF shirt, then add artwork, text, size,
              color, and production notes.
            </p>
          </div>
          <p className="rounded-full bg-background px-4 py-2 text-sm font-black">
            From {formatCurrency(baseProduct.price)}
          </p>
        </div>

        <div className="grid gap-3 rounded-lg border border-dashed border-accent/40 bg-[#fff6f2] p-5">
          <div>
            <p className="font-black">Upload artwork</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Transparent PNG files work best for apparel previews.
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-line bg-white p-4 text-sm font-semibold"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        <label className="grid gap-2 text-sm font-black">
          Custom text and placement notes
          <textarea
            value={customText}
            onChange={(event) => setCustomText(event.target.value)}
            rows={5}
            className="rounded-md border border-line bg-background px-4 py-3 text-sm font-semibold"
            placeholder="Names, dates, slogans, front/back placement, sleeve notes"
          />
        </label>

        <div className="grid gap-5">
          <div>
            <p className="text-sm font-black">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {baseProduct.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`h-11 min-w-12 rounded-md border px-4 text-sm font-black transition ${
                    size === item
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-background text-muted hover:border-accent hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black">Shirt color</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {baseProduct.colors.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setColor(item)}
                  className={`flex h-11 items-center gap-2 rounded-md border px-3 text-sm font-black transition ${
                    color === item
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-background text-muted hover:border-accent hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full border border-line ${
                      colorValues[item] ?? "bg-zinc-300"
                    }`}
                  />
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black">Print type</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {baseProduct.printTypes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrintType(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                    printType === item
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-background text-muted hover:border-accent hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="h-12 rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226]"
        >
          Add custom order to cart
        </button>
        {saved ? (
          <p className="rounded-md bg-[#fff6f2] px-4 py-3 text-sm font-black text-accent">
            Added to cart. Your custom options are saved locally.
          </p>
        ) : null}
      </form>

      <section className="h-fit rounded-lg border border-line bg-[#e9e3d7] p-5 shadow-[0_18px_60px_rgba(17,17,17,0.06)] sm:p-7 lg:sticky lg:top-28">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-accent">
              Live preview
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Front chest mockup
            </h2>
          </div>
          <p className="rounded-full bg-white px-3 py-1 text-sm font-black">
            {size}
          </p>
        </div>

        <div className="mt-6 grid min-h-[520px] place-items-center rounded-lg bg-white p-6">
          <div className="relative grid h-[360px] w-[250px] place-items-center text-center text-white">
            <div
              className={`absolute inset-x-8 top-0 h-16 rounded-t-[42px] ${
                colorValues[color] ?? "bg-ink"
              }`}
            />
            <div
              className={`absolute inset-x-0 bottom-0 top-12 rounded-b-2xl rounded-t-[56px] shadow-2xl ${
                colorValues[color] ?? "bg-ink"
              }`}
            />
            <div className="relative z-10 grid max-w-[150px] place-items-center">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Uploaded artwork preview"
                  className="max-h-32 max-w-32 object-contain"
                />
              ) : (
                <span className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-zinc-200">
                  Artwork preview
                </span>
              )}
              {customText ? (
                <p className="mt-4 break-words text-sm font-black">
                  {customText}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 rounded-lg bg-white p-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="font-bold text-muted">Color</span>
            <span className="font-black">{color}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="font-bold text-muted">Print</span>
            <span className="font-black">{printType}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="font-bold text-muted">Base product</span>
            <span className="font-black">{baseProduct.name}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
