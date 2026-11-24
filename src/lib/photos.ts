import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
});

/** Look up a photo in src/assets/photos by its file name, for example "coast-1.jpg". */
export function photo(name: string): ImageMetadata {
  const found = files[`../assets/photos/${name}`];
  if (!found) throw new Error(`Photo "${name}" isn't in src/assets/photos. Check the file name in src/data/site.ts.`);
  return found.default;
}
