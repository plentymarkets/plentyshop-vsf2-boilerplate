export interface CategoryDetails {
    metaRobots: string
    shortDescription: string
    singleItemView: string
    canonicalLink: string
    fulltext: string
    updatedBy: string
    metaDescription: string
    metaTitle: string
    lang: string
    name: string
    categoryId: string
    itemListView: string
    position: string
    description2: string
    nameUrl: string
    plenty_category_details_image_path: string
    plenty_category_details_image2_path: string
    description: string
    updatedAt: string
    metaKeywords: string
    pageView: string
    image: number
    imagePath: string
    image2: string
    image2Path: string
    plentyId: number
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
    details: CategoryDetails[]
    id: number
    itemCount: ItemCount[]
    level: number
    linklist: string
    parentCategoryId: number
    right: string
    sitemap: string
    type: string,
    clients: client[]
}

