export interface CategoryDetails {
    canonicalLink: string
    categoryId: string
    description: string
    description2: string
    fulltext: string
    image: number
    image2: string
    image2Path: string
    imagePath: string
    itemListView: string
    lang: string
    metaDescription: string
    metaKeywords: string
    metaRobots: string
    metaTitle: string
    name: string
    nameUrl: string
    pageView: string
    plenty_category_details_image_path: string
    plenty_category_details_image2_path: string
    plentyId: number
    position: string
    shortDescription: string
    singleItemView: string
    updatedAt: string
    updatedBy: string
}
export interface ItemCount {
    count: number
}

interface client {
    categoryId: string
    plentyId: number
}

export interface Category {
    childCount: number
    children: Category[]
    clients: client[]
    details: CategoryDetails[]
    id: number
    itemCount: ItemCount[]
    level: number
    linklist: string
    parentCategoryId: number
    right: string
    sitemap: string
    type: string,
}

