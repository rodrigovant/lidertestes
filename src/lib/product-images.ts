import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"] as const;

export function findProductImage(slug: string): string | null {
  const publicDir = path.join(process.cwd(), "public", "products");
  for (const ext of EXTENSIONS) {
    const file = path.join(publicDir, `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/products/${slug}.${ext}`;
  }
  return null;
}
