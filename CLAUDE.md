# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server with hot reload
npm run build      # production build
npm run preview    # preview production build locally
```

PHP backend (run from `php/`):
```bash
composer install   # first-time setup (uses shared stripe lib, see below)
cd public && php -S 127.0.0.1:4242
```

## Architecture

Vue 3 SPA with a PHP Stripe backend. No test suite.

### Frontend (`src/`)

- **Entry**: `main.ts` mounts to `window.asoneId` (not `#app`) — the app is embedded as a module inside the "asone" host platform.
- **Router**: `vue-router` with `createWebHistory`. Routes: `/`, `/product/:productId`, `/cart`, `/checkout`, `/about`.
- **State**: Two Pinia stores — `store/cart.ts` (add/remove/clear, reads/writes `localStorage`) and `store/products.ts` (read-only, initialized synchronously at import time).
- **`@` alias** resolves to `src/`.

### asone Platform Globals

All runtime data arrives via `window` globals injected by the host platform — there is no API fetch for products:

| Global | Purpose |
|---|---|
| `window.asoneId` | DOM element ID to mount into |
| `window.asonePath` | URL path segment (used in API calls and localStorage key) |
| `window.asoneArea` | URL area segment (used in API calls) |
| `window.asoneData` | Base64-encoded JSON array of `Product[]` |
| `window.asoneDataHTML` | Base64-encoded JSON with optional `HomeTop`/`HomeBottom` HTML blocks |

`src/shared/utils.ts` re-exports all globals and decodes the base64 data. The product store initializes from `asoneData` at module load time — not lazily.

### Cart Persistence

`usePersistCart` composable (mounted in `App.vue`) subscribes to cart store changes and syncs to `localStorage`. The storage key is `"CART_STORAGE" + asonePath`, allowing multiple instances at different paths to maintain separate carts.

### Stripe Payment Flow

1. `Checkout.vue` fetches `php/public/config.php` → gets `publishableKey`
2. Calls `php/public/createintent.php` (POST with `amount`, `currency`) → gets `clientSecret`
3. Mounts Stripe Elements (`payment` + `linkAuthentication`) into the DOM
4. On submit, calls `stripe.confirmPayment()` with `return_url: window.location.origin + "/"`

The PHP files are accessed at `{origin}/{asonePath}/{asoneArea}/ws/php/public/`.

### PHP Backend (`php/`)

- Uses `vlucas/phpdotenv` and `stripe/stripe-php`
- `config.php` uses `get_docroot()` to traverse up to the `docs/` directory and loads the Stripe library from `../../lib/stripe/php/vendor/autoload.php` — **not** from a local `vendor/` folder
- Requires `php/.env` with `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `DOMAIN`
