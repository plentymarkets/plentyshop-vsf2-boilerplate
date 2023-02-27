import { ReviewAverage } from './review';

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
    attributes: {
      attributeId: number,
      attributeValueId: number
    }[]
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
}
