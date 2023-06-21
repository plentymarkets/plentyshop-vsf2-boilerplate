export type CategoryTreeItemDetails = {
    name: string,
    lang: string,
    nameUrl: string,
    metaTitle: string,
    imagePath: string,
    image2Path: string,
};
export interface CategoryTreeItemCount {
    count: number
}

export type CategoryTreeItem = {
    id: number,
    type: string,
    itemCount: CategoryTreeItemCount[],
    childCount: number,
    children: CategoryTreeItem[],
    details: CategoryTreeItemDetails[]
};

