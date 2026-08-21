import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ProductColor {
  name: string;
  value: string;
  priceModifier: number;
}

export interface ProductSize {
  name: string;
  priceModifier: number;
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'text' })
  slug: string;

  @Column({ unique: true, type: 'text' })
  sku: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'decimal', default: 0 })
  discount: number;

  @Column({ type: 'boolean', default: false })
  isNew: boolean;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'simple-json', default: '[]' })
  gallery: string[];

  @Column({ type: 'simple-json', default: '[]' })
  colors: ProductColor[];

  @Column({ type: 'simple-json', default: '[]' })
  sizes: ProductSize[];

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  complementaryDescription: string;

  @Column({ type: 'text' })
  additionalInfo: string;
}