export interface Locale {
  code: string;
  label: string;
}

function getCode(locale: Locale): string {
  return locale ? locale.code : 'en';
}
function getLabel(locale: Locale): string {
  return locale ? locale.label : 'en';
}

export const localesGetters = {
  getCode,
  getLabel
};
