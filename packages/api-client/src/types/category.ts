export type CategoryDetails = {
    name: string,
    lang: string,
    nameUrl: string,
    metaTitle: string,
    imagePath: string,
    image2Path: string,
};
export interface ItemCount {
    count: number
}

export type Category = {
    id: number,
    type: string,
    itemCount: ItemCount[],
    childCount: number,
    children: Category[],
    details: CategoryDetails[]
};
