# Sahli Prints

Modern ecommerce starter for a custom printing business using Next.js App
Router, TypeScript, Tailwind CSS, Stripe Checkout, MongoDB Atlas, Cloudinary,
and Vercel.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

- `NEXT_PUBLIC_SITE_URL`: local or production site URL
- `MONGODB_URI`: MongoDB Atlas connection string
- `MONGODB_DB`: database name
- `STRIPE_SECRET_KEY`: Stripe secret API key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `CLOUDINARY_UPLOAD_FOLDER`: folder for customer artwork

## Stripe Setup

Create a Stripe account, get a test secret key, and add it to `.env.local`.
The checkout route lives at `app/api/checkout/route.ts`. Webhook handling lives
at `app/api/stripe/webhook/route.ts` and updates orders when checkout sessions
complete.

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## MongoDB Setup

Create a MongoDB Atlas cluster, add your IP to Network Access, create a database
user, and place the connection string in `MONGODB_URI`. The helper in
`src/lib/mongodb.ts` connects lazily and uses `sahli_prints` by default.

Starter model types are in `src/lib/models`:

- Product
- Order
- User
- Review
- Upload

## Cloudinary Setup

Create a Cloudinary account and add the cloud name, API key, and API secret.
The signing route is `app/api/cloudinary/signature/route.ts`. The current custom
order form includes a local preview and is ready to be upgraded to direct signed
Cloudinary uploads.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.
5. Add the production Stripe webhook endpoint:
   `https://your-domain.com/api/stripe/webhook`.

## Structure

- `app/`: App Router pages and route handlers
- `src/components/`: reusable UI, layout, product, cart, and form components
- `src/lib/`: product seed data, integration helpers, utility functions, models
- `src/types/`: shared TypeScript types
