export interface CookieGroups {
  id: number,
  barTitle: string,
  barDescription: string,
  name: string,
  description: string,
  showMore: boolean,
  list: any[]
}

export interface Cookie {
  name: string,
  cookies: any[]
}

function getId(cookieGroups: CookieGroups): number {
  return cookieGroups?.id;
}
function getBarTitle(CookieGroups: CookieGroups): string {
  return CookieGroups?.barTitle;
}

function getBarDescription(cookieGroups: CookieGroups): any {
  return cookieGroups?.barDescription;
}

function getListOfGroups(cookieGroups: CookieGroups): any[] {
  return cookieGroups?.list;
}

function getCookieGroupName(CookieGroups: CookieGroups): string {
  return CookieGroups?.name ?? '';
}

function getCookieName(CookieGroups: Cookie): string {
  return CookieGroups?.name ?? '';
}

function getCookieGroupNameWithCount(CookieGroups: CookieGroups): string {
  return CookieGroups?.name + ' (' + CookieGroups?.list.length + ')';
}

function getCookiesList(cookie: Cookie): any[] {
  return cookie?.cookies;
}
function getShowMore(CookieGroups: CookieGroups): boolean {
  return CookieGroups?.showMore ?? false;
}

export const cookieBarGetters = {
  getId,
  getBarTitle,
  getBarDescription,
  getListOfGroups,
  getCookieGroupNameWithCount,
  getCookieName,
  getCookieGroupName,
  getCookiesList,
  getShowMore
};
