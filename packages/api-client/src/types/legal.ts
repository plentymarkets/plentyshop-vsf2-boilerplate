export type LegalInformationResponse = {
    plentyId: number,
    lang: string,
    type: 'TermsConditions' | 'CancellationRights' | 'PrivacyPolicy' | 'LegalDisclosure' | 'WithdrawalForm',
    plainText: string,
    htmlText: string
}
