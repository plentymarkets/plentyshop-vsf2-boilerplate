import { Product } from './product';

export type WishlistItem = Product;

export type Wishlist = { items: WishlistItem[] }

export interface Document {
    data: Product;
    id: number;
}

export interface WishlistServerResponse {
    total: number;
    documents: Document[];
    inactiveVariationIds: number[];
}

