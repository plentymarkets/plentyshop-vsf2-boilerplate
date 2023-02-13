function getHtml(type: { htmlText: string, plainText: string }):string {
  return type?.htmlText ?? type?.plainText ?? '';
}
export const legalGetters = {
  getHtml
};
