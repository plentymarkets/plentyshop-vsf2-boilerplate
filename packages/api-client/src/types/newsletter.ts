export type NewsletterParams = {
    email: string,
    firstName: string,
    lastName: string,
    emailFolder: number
}

export type SubscribeNewsletterResponse = {
    data: string
}


export type UnsubscribeNewsletterResponse = {
    data: boolean
}
