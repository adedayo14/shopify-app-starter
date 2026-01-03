import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

/**
 * This route handles session token authentication for embedded apps.
 * Required for the new embedded auth strategy (unstable_newEmbeddedAuthStrategy).
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};
