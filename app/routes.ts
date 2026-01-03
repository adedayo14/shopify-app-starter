import { type RouteConfig, index, route, layout } from "@remix-run/route-config";

export default [
  // Public landing page
  index("routes/_index.tsx"),

  // CRITICAL: Auth routes (required for Shopify OAuth)
  // Without these routes, you'll get 410 "Gone" and 500 errors on app load
  route("auth", "routes/auth.tsx"),
  route("auth/session-token", "routes/auth.session-token.tsx"),

  // Main app route (authenticated)
  // Using layout() for app routes ensures proper auth context
  layout("routes/app.tsx", [
    route("app", "routes/app._index.tsx"),
    // Add authenticated app routes here
  ]),

  // GDPR Compliance Webhooks (required)
  route("webhooks/customers/data_request", "routes/webhooks.customers.data_request.tsx"),
  route("webhooks/customers/redact", "routes/webhooks.customers.redact.tsx"),
  route("webhooks/shop/redact", "routes/webhooks.shop.redact.tsx"),

  // App lifecycle webhook
  route("webhooks/app/uninstalled", "routes/webhooks.app.uninstalled.tsx"),

  // Add your custom routes here
] satisfies RouteConfig;
