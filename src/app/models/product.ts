import { ProductImage } from './product-image';
import { Category } from './category';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  isAvailable: boolean;
  isPublished: boolean;
  category: Category;
  productImages: ProductImage[];
  thumbnail: string;
  isFeatured: boolean;
}
