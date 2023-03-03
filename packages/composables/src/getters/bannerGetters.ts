export interface Baner {
  slot: string,
  title: string,
  subtitle: string,
  description: string,
  buttonText: string,
  link: string,
  image: string,
  class: string
};
function getSlot(banner: Baner): string {
  return banner?.slot || '';
}

function getTitle(banner: Baner): string {
  return banner?.title || '';
}

function getSubTitle(banner: Baner): string {
  return banner?.subtitle || '';
}

function getDescription(banner: Baner): string {
  return banner?.description || '';
}

function getButtonText(banner: Baner): string {
  return banner?.buttonText || '';
}

function getLink(banner: Baner): string {
  return banner?.link || '';
}

function getImage(banner: Baner): string {
  return banner?.image || '';
}

function getClass(banner: Baner): string {
  return banner?.class || '';
}

export const bannerGetters = {
  getSlot,
  getTitle,
  getSubTitle,
  getDescription,
  getButtonText,
  getLink,
  getImage,
  getClass
};
