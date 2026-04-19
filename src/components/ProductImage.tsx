import Image from "next/image";
import { type Product } from "@/lib/data";
import { findProductImage } from "@/lib/product-images";
import InstrumentIllustration from "./InstrumentIllustration";

type Props = {
  product: Product;
  priority?: boolean;
  sizes?: string;
};

export default function ProductImage({ product, priority, sizes }: Props) {
  const imgSrc = findProductImage(product.slug);

  if (imgSrc) {
    return (
      <div className="relative w-full h-full bg-white">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          className="object-contain p-4"
        />
      </div>
    );
  }

  return <InstrumentIllustration product={product} className="w-full h-full" />;
}
