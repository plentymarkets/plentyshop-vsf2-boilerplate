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
