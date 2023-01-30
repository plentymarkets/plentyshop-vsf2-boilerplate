import { IntegrationContext, ApiClientMethods, ProductsSearchParams, AgnosticCategoryTree, UseUserOrderSearchParams } from '@vue-storefront/core';
import { AxiosInstance } from 'axios';
import { Order } from './types/order';

export type TODO = unknown;

export type Settings = {
  api: {
    url: string
  }
};

export type PaginatedResult<T> = {
  firstOnPage: number,
  isLastPage: boolean,
  itemsPerPage: number,
  lastOnPage: number,
  lastPageNumber: number,
  page: number,
  totalsCount: number,
  entries: T[]
}

export type ReviewAverage = {
  counts: {
    ratingsCountOf1: string,
    ratingsCountOf2: string,
    ratingsCountOf3: string,
    ratingsCountOf4: string,
    ratingsCountOf5: string,
    ratingsCountTotal: string,
    averageValue: string,
    highestCount: string
  }
};

export type ProductAttribute = {
  attributeId: number,
  position: number,
  name: string,
  type: string,
  values: {
    attributeValueId: number,
    position: number,
    imageUrl: string,
    name: string
  }[]
}

export type ProductVariation = {
  variationId: number,
  isSalable: boolean,
  unitCombinationId: number,
  unitId: number,
  unitName: string,
  attributes: { attributeId: number, attributeValueId: number }[]
}

export type Product = {
  attributes: {
    attributeId: number,
    valueId: number
  }[],
  texts: {
    name1: string,
    name2: string,
    name3: string,
    description: string,
    technicalData: string,
    shortDescription: string,
    urlPath: string,
    lang: string,
  },
  images: {
    all: {
      position: string,
      names: {
        imageId: number,
        name: string,
        alternate: string,
        lang: string
      }
      url: string,
      urlMiddle: string,
      urlPreview: string
    }[],
    variation: {
      position: string,
      names: {
        imageId: number,
        name: string,
        alternate: string,
        lang: string
      }
      url: string,
      urlMiddle: string,
      urlPreview: string
    }[],
  },
  defaultCategories: {
    id: number,
    parentCategoryId: number,
    level: 2
  }[]
  name: string,
  variation: {
    id: number
  },
  item: {
    id: number
  },
  sku: string,
  prices: {
    rrp: any,
    default: any
  },
  feedback: ReviewAverage,
  variationAttributeMap?: {
    attributes: ProductAttribute[],
    variations: ProductVariation[]
  }
};

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type TotalVat = {
  vatAmount: number
  vatValue: number
};

export type CartItem = {
  id: number
  quantity: number
  price: number
  itemId: number
  variation: Product
  variationId: number
  basketItemOrderParams: any[]
  inputLength: number
  inputWidth: number
  setComponents: any[]
  itemType: number
};

export type Cart = {
  id: number
  sessionId: string
  orderId: number
  customerId: number
  customerShippingAddressId: number
  currency: string
  referrerId: number
  shippingCountryId: number
  methodOfPaymentId: number
  shippingProviderId: number
  shippingProfileId: number
  itemSum: number
  itemSumNet: number
  basketAmount: number
  basketAmountNet: number
  shippingAmount: number
  shippingAmountNet: number
  paymentAmount: number
  couponCode: string
  couponDiscount: number
  shippingDeleteByCoupon: boolean
  basketRebate: number
  maxFsk: number
  orderTimestamp: string
  createdAt: string
  updatedAt: string
  basketRebateType: string
  customerInvoiceAddressId: number
  itemQuantity: number
  totalVats: TotalVat[]
  subAmount: number
  isExportDelivery: boolean
  shopCountryId: number
  itemWishListIds: number[],
  items: CartItem[]
};

export type CategoryDetails = {
  name: string,
  lang: string,
  nameUrl: string,
  metaTitle: string,
  imagePath: string,
  image2Path: string,
};

export type Category = {
  id: number,
  type: string,
  // TODO: maybe implement correct type
  itemCount: any,
  childCount: number,
  children: Category[],
  details: CategoryDetails[]
};

export type Coupon = TODO;

export type FacetSearchCriteria = TODO;

export type PasswordResetResult = TODO;

export type ProductFilter = TODO;

export type Filter = {
  id: number,
  name: string,
  cssClass?: string,
  position?: number,
  count?: number,
  selected?: boolean
}

export type FilterGroup = {
  count: number,
  id: number,
  name: string,
  type: string,
  cssClass?: string,
  maxResultCount?: string,
  minHitCount?: string,
  position?: number,
  sort?: string,
  values?: Filter[]
}

export declare type ReviewItem = {
  id: number,
  title: string,
  isVisible: true,
  createdAt: string,
  updatedAt: string,
  authorName: string,
  feedbackComment: {
    commentId: string,
    commentRelationType: string,
    commentRelationTargetId: string,
    comment: {
      id: number,
      message: string,
      isVisible: string,
      createdAt: string,
      updatedAt: string
    }
  },
  feedbackRating: {
    ratingId: string,
    ratingRelationType: string,
    ratingRelationTargetId: string,
    rating: {
      id: string,
      ratingValue: string,
      isVisible: string,
      createdAt: string,
      updatedAt: string
    }
  },
  targetRelation: {
    feedbackId: string,
    feedbackRelationType: string,
    feedbackRelationTargetId: string,
    variationAttributes: [],
    targetRelationLabel: string,
    targetRelationName: [],
    feedbackRelationParentTargetId: number
  },
  sourceRelation: [
    feedbackId: string,
    feedbackRelationType: string,
    feedbackRelationSourceId: string,
    sourceRelationLabel: string,
    sourceRelationTypeLabel: string,
    feedback: {
      id: number,
      title: string,
      isVisible: boolean,
      createdAt: string,
      updatedAt: string,
      authorName: string
    }
  ],
  replies: []
};

export type Review = {
  feedbacks: ReviewItem[],
  itemAttributes: [],
  pagination: {
    page: number,
    lastPage: number,
    isLastPage: true
  }
};

export type Facet = {
  products: Product[],
  tree: AgnosticCategoryTree,
  facets: FilterGroup[],
  pagination: any
};

export type CategoryPage = {
  products: Product[],
  facets: FilterGroup[],
  pagination: any
}

export type User = {
  guestMail?: string,
  accounts?: []
  anonymizeAt?: string
  birthdayAt?: string
  blocked?: number
  bookAccount?: string
  classId?: number
  contactPerson?: string
  createdAt?: string
  dhlPostIdent?: string
  discountDays?: number
  discountPercent?: number
  ebayName?: string
  email?: string
  externalId?: string
  firstName?: string
  formOfAddress?: string
  fullName?: string
  gender?: string
  id?: number
  inLeadStatusSince?: number
  isLead?: boolean
  klarnaPersonalId?: string
  lang?: string
  lastLoginAt?: string
  lastName?: string
  lastOrderAt?: string
  leadStatusKey?: string
  marketplacePartner?: string
  newsletterAllowanceAt?: number
  number?: number
  options?: []
  paypalEmail?: string
  paypalPayerId?: string
  plentyId?: number
  privateFax?: string
  privateMobile?: string
  privatePhone?: string
  rating?: number
  referrerId?: number
  salesRepresentativeContactId?: number
  singleAccess?: string
  timeForPaymentAllowedDays?: number
  title?: string
  typeId?: number
  updatedAt?: string
  userId?: number
  valuta?: number
}

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export interface ShippingPrivacyInformation {
  showDataPrivacyAgreementHint: boolean
  id: number
  parcelServiceId: number
  parcelServiceName: string
  parcelServiceAddress: string
}

export type ShippingMethod = {
  parcelServicePresetId: number
  parcelServicePresetName: string
  parcelServiceType: number
  parcelServiceId: number
  parcelServiceName: string
  shippingAmount: number
  shippingPrivacyInformation: ShippingPrivacyInformation[]
  isPostOffice: boolean
  isParcelBox: boolean
  icon: any
  excludedPaymentMethodIds: number[]
  allowedPaymentMethodNames: string[]
};

export interface ShippingProvider {
  list: ShippingMethod[],
  selected: number
}

export type Store = TODO;

export type WishlistItem = Product;

export type Wishlist = { items: WishlistItem[] };

export type ClientInstance = AxiosInstance;

export type ReviewSearchParams = {
  productId: string,
  itemId: number
}

export type ItemSearchParams = {
  term: string
}

export type ItemSearchResult = {
  products: Product[]
}

export type SessionSearchPramas = {
  initialRestCall: string
}

export type SessionResult = {
  basket: any,
  user: User,
}

export type RegisterParams = {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

export enum AddressType {
  Billing = 1,
  Shipping = 2
}

export enum AddressOptionType {
  VATNumber = 1,
  ExternalAddressID = 2,
  EntryCertificate = 3,
  Telephone = 4,
  Email = 5,
  PostNumber = 6,
  PersonalId = 7,
  BBFC = 8,
  Birthday = 9,
  SessionID = 10,
  Title = 11,
  ContactPerson = 12,
  ExternalCustomerID = 13
}

export type AddressOption = {
  id: number;
  addressId: number;
  typeId: AddressOptionType;
  value: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AddressData = {
    id: number;
    gender: string;
    name1?: string;
    name2: string;
    name3: string;
    name4?: string;
    address1: string;
    address2: string;
    address3?: string;
    address4?: string;
    postalCode: string;
    town: string;
    countryId: string | null;
    stateId?: string | null;
    readOnly: boolean;
    checkedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    contactPerson: string;
    options: AddressOption[];
    primary: number;
}

export type Address = {
  id?: number,
  firstName: string,
  lastName: string,
  streetName: string,
  apartment: string,
  city: string,
  state: string | null | undefined,
  country: string | null | undefined,
  zipCode: string,
  phoneNumber: string | null | undefined,
  email?: string,
  primary?: number
}

export type State = {
  id: number,
  name: string
}

export type Country = {
  id: number,
  name: string,
  isoCode2: string,
  states: State[]
}

export type ShippingCountryName = {
  country_id: string,
  id: number,
  language: string,
  name: string
}

export type ShippingCountryState = {
  countryId: string,
  id: number,
  isoCode: string,
  isoCode3166: string,
  name: string
}

export type ActiveShippingCountry = {
  active: boolean,
  currLangName: string,
  id: number,
  isCountryStateMandatory: boolean,
  isoCode2: string,
  isoCode3: string,
  lang: string,
  name: string,
  names: ShippingCountryName[]
  shippingDestinationId: number,
  states: ShippingCountryState[]
  storehouseId: number
  vatCodes:string[]
}

export type PaymentMethod = {
  id: number,
  name: string,
  fee: number,
  icon: string,
  description: string,
  sourceUrl: string,
  isSelectable: boolean,
  key: string
}

export type PaymentProviders = { list: PaymentMethod[], selected: number}

export type PreparePaymentResult = {
    type: string,
    value: any
}

export type CreateOrderResponse = {
  events: any[],
  data: Order
}

export type GetOrdersResponse = {
  events: any[],
  data: PaginatedResult<Order>
}

export interface UserAddressGetters {
  getAddresses: (addresses: Address[], criteria?: Record<string, any>) => Address[];
  getDefault: (addresses: Address[]) => Address;
  getTotal: (addresses: Address[]) => number;
  getPostCode: (address: Address) => string;
  getStreetName: (address: Address) => string;
  getStreetNumber: (address: Address) => string | number;
  getCity: (address: Address) => string;
  getFirstName: (address: Address) => string;
  getLastName: (address: Address) => string;
  getCountry: (countries: Country[], id: string) => string;
  getPhone: (address: Address) => string;
  getEmail: (address: Address) => string;
  getProvince: (address: Address) => string;
  getCompanyName: (address: Address) => string;
  getTaxNumber: (address: Address) => string;
  getId: (address: Address) => string | number;
  getApartmentNumber: (address: Address) => string | number;
  isDefault: (address: Address) => boolean;
  getAddressWithoutId(address: Address): Address;
}

export interface CountryGetters {
  getStates(country: Country): string,
  getStateId(state: State): string,
  getStateName(state: State): string,
  getCountryId(country: Country): string,
  getCountryName(country: Country): string,
  getCountryIsoCode(country: Country): string
}

export interface PlentymarketsApiMethods {
  getProduct(
    params: ProductsSearchParams
  ): Promise<Product[]>,

  getCategory(
    params: any
  ): Promise<Category[]>,

  getFacet(
    params: any
  ): Promise<CategoryPage>,

  getReview(
    params: ReviewSearchParams
  ): Promise<Review>

  getSearch(
    params: ItemSearchParams
  ): Promise<ItemSearchResult>

  getWishlist(): Promise<Wishlist>,

  addWishlistItem(
    productId: number
  ): Promise<boolean>,

  removeWishlistItem(
    productId: number
  ): Promise<boolean>,

  getCart(): Promise<Cart>,

  addCartItem(
    params: { productId: number, quantity?: number }
  ): Promise<Cart>,

  removeCartItem(
    cartItemId: number
  ): Promise<Cart>,

  updateCartItemQty(
    params: { productId: number, cartItemId: number, quantity: number }
  ): Promise<Cart>

  getSession(initialRestCall: boolean): Promise<SessionResult>

  loginUser(email: string, password: string): Promise<SessionResult>

  registerUser(params: RegisterParams): Promise<any>

  logoutUser(): Promise<boolean>

  changePassword(currentPassword, newPassword): Promise<boolean>

  getShippingProvider(): Promise<ShippingProvider>

  selectShippingProvider(shippingId: number): Promise<string>

  loginAsGuest(email: string): Promise<SessionResult>

  loadAddresses(typeId: AddressType): Promise<AddressData[]>

  saveAddress(typeId: AddressType, addressData: TODO): Promise<any>

  setAddressAsDefault(addressId: number, typeId: number): Promise<any>;

  deleteAddress(addressId: number, typeId: number): Promise<any>;

  getActiveShippingCountries(): Promise<ActiveShippingCountry[]>

  getPaymentProviders(): Promise<PaymentProviders>

  setPaymentProvider(paymentId: number): Promise<string>

  additionalInformation(params: any): Promise<void>

  preparePayment(): Promise<PreparePaymentResult>

  placeOrder(): Promise<CreateOrderResponse>

  getOrders(params: UseUserOrderSearchParams): Promise<GetOrdersResponse>

  executePayment(orderId: number, paymentId: number): Promise<void>

  saveBillingIsShipping(): Promise<any>
}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
