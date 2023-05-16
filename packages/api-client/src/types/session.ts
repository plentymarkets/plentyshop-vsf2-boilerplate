import { Cart } from './cart';
import { User } from './user';
export type SessionSearchPramas = {
    initialRestCall: string
}

export type SessionResult = {
    cart: Cart,
    cartItems: unknown,
    contact: User,
    guest: string
}
