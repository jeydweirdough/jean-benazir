import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const client = createClient({
  projectId: "r21fiqjr",
  dataset: "production",
  apiVersion: "2024-01-01",
  // Read straight from the live dataset, not the CDN cache — a CMS edit should
  // show up on refresh immediately, which is exactly what's being tested here.
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}
