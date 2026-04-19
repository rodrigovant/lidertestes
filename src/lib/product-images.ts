import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"] as const;
const BRAND_EXTENSIONS = ["svg", "png", "jpg", "webp"] as const;

export function findProductImage(slug: string): string | null {
  const publicDir = path.join(process.cwd(), "public", "products");
  for (const ext of EXTENSIONS) {
    const file = path.join(publicDir, `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/products/${slug}.${ext}`;
  }
  return null;
}

export function findBrandLogo(slug: string): string | null {
  const publicDir = path.join(process.cwd(), "public", "brands");
  for (const ext of BRAND_EXTENSIONS) {
    const file = path.join(publicDir, `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/brands/${slug}.${ext}`;
  }
  return null;
}
