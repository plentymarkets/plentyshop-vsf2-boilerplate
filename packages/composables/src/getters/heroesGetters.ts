export type Hero = {
  title: string,
  subtitle: string,
  background: string,
  image: string,
  className: string
};

function getTitle(banner: Hero): string {
  return banner?.title || '';
}

function getSubTitle(banner: Hero): string {
  return banner?.subtitle || '';
}

function getBackground(banner: Hero): string {
  return banner?.background || '';
}

function getImage(banner: Hero): string {
  return banner?.image || '';
}

function getClassName(banner: Hero): string {
  return banner?.className || '';
}

export const heroesGetters = {
  getTitle,
  getSubTitle,
  getBackground,
  getImage,
  getClassName
};
