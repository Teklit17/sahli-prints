import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/src/components/cart/cart-provider";
import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";
import { getCurrentUser } from "@/src/lib/auth/session";

export const metadata: Metadata = {
  title: {
    default: "Sahli Prints | Custom Printing Studio",
    template: "%s | Sahli Prints",
  },
  description:
    "Premium custom DTF shirts, HTV vinyl apparel, sublimation drinkware, hoodies, totes, and personalized gifts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <CartProvider>
          <Header user={currentUser} />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
