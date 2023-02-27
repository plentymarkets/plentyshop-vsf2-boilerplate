import { Cart } from './cart';
import { User } from './user';
export type SessionSearchPramas = {
    initialRestCall: string
}

export type SessionResult = {
    basket: Cart,
    user: User,
}
