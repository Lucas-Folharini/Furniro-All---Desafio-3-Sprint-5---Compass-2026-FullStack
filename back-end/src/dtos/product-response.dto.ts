import { Product, ProductColor, ProductSize } from '../entities/product.entity';

export class ProductResponseDto {
  id: number;
  slug: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  finalPrice: number;
  discount: number;
  isNew: boolean;
  image: string;
  description: string;
  gallery: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  badge: string | null;
  badgeColor: string | null;
  complementaryDescription: string;
  additionalInfo: string;

  static from(product: Product): ProductResponseDto {
    const parsedPrice = Number(product.price);
    const parsedDiscount = Number(product.discount);

    const discountPrice = parsedPrice * (1 - parsedDiscount / 100);
    const hasDiscount = parsedDiscount > 0;

    return {
      ...product,
      price: parsedPrice,
      discount: parsedDiscount,
      badge: hasDiscount ? `-${parsedDiscount}%` : product.isNew ? 'New' : null,
      badgeColor: hasDiscount ? '#E97171' : product.isNew ? '#2EC1AC' : null,
      finalPrice: Number(discountPrice.toFixed(2))
    };
  }
}