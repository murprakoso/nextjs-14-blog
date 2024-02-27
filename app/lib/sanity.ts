import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Set up the client for fetching data in the getProps page functions
 * This is the same client you'd use in front-end code
 * https://www.sanity.io/docs/client-libraries/js-client
 * https://www.sanity.io/docs/data-store/how-queries-work
 */
export const client = createClient({
  projectId: "a54q7aa8",
  dataset: "production",
  apiVersion: "2021-03-07",
  useCdn: false,
});

/**
 * Helper function to generate image URLs with fixed width and height
 */
export const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
