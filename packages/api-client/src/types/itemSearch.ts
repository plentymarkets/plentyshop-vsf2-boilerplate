import { Product } from './product';

export type ItemSearchParams = {
    term: string
}

export type ItemSearchResult = {
    products: Product[]
}
