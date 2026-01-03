import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, Banner } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);

  return json({
    shop: session.shop,
  });
}

export default function AppIndex() {
  const { shop } = useLoaderData<typeof loader>();

  // IMPORTANT: For embedded Shopify apps, always use useFetcher() instead of useSubmit()
  // The new embedded auth strategy requires useFetcher() for proper session token handling
  // Example:
  //   const fetcher = useFetcher();
  //   fetcher.submit(data, { method: "post", action: "/app/action" });

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Banner tone="info">
              <Text as="p" variant="bodyMd">
                This is a production-ready Shopify app starter template with all critical fixes applied.
              </Text>
            </Banner>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Welcome to your Shopify app!
                </Text>
                <Text as="p" variant="bodyMd">
                  Connected to: {shop}
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Start building your app features here. Check the README for important patterns and best practices.
                </Text>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
