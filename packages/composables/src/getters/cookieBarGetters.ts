export interface Cookie {
  name: string,
  Provider: string,
  Status: string,
  Lifespan: string
}
export interface CookieGroup {
  id: number,
  name: string,
  description: string,
  showMore: boolean,
  cookies: Cookie[]
}
export interface CookieGroups {
  barTitle: string,
  barDescription: string,
  groups: CookieGroup[]
}

function getBarTitle(CookieGroups: CookieGroups): string {
  return CookieGroups?.barTitle;
}

function getBarDescription(cookieGroups: CookieGroups): string {
  return cookieGroups?.barDescription;
}

function getCookieGroupName(CookieGroup: CookieGroup): string {
  return CookieGroup?.name ?? '';
}

function getCookieGroupDescription(CookieGroup: CookieGroup): string {
  return CookieGroup?.description ?? '';
}

function getCookieName(Cookie: Cookie): string {
  return Cookie?.name ?? '';
}

function getCookieGroupNameWithCount(CookieGroup: CookieGroup): string {
  return CookieGroup?.name + ' (' + CookieGroup?.cookies.length + ')';
}

function getCookiesList(CookieGroup: CookieGroup): Cookie[] {
  return CookieGroup?.cookies;
}

function getShowMore(CookieGroup: CookieGroup): boolean {
  return CookieGroup?.showMore ?? false;
}

export const cookieBarGetters = {
  getBarTitle,
  getBarDescription,
  getCookieGroupName,
  getCookieGroupNameWithCount,
  getCookieGroupDescription,
  getCookieName,
  getCookiesList,
  getShowMore
};
