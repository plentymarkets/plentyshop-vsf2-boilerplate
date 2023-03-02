import { Context, SessionResult, RegisterParams, UserChangeResponse} from 'src/types';

export async function loginUser(context: Context, email: string, password: string): Promise<SessionResult> {
  const url: URL = new URL('/rest/io/customer/login/', context.config.api.url);
  const { data } = await context.client.post(url.href, {
    email,
    password
  });

  return data;
}

export async function loginAsGuest(context: Context, email: string): Promise<SessionResult> {
  const url: URL = new URL('/rest/io/guest/', context.config.api.url);
  const { data } = await context.client.post(url.href, {
    email
  });

  return data;
}

export async function logoutUser(context: Context): Promise<boolean> {
  const url: URL = new URL('/rest/io/customer/logout/', context.config.api.url);
  const { data } = await context.client.post(url.href);
  return data;
}

export async function registerUser(context: Context, params: RegisterParams): Promise<UserChangeResponse> {
  const url: URL = new URL('/rest/io/customer/', context.config.api.url);
  const { data } = await context.client.post(url.href, {
    contact: {
      password: params.password,
      typeId: 1,
      referrerId: 1,
      options: {
        typeId: {
          value: params.email,
          subTypeId: 4,
          priority: 0,
          typeId: 2
        }
      }
    }
  });
  return data;
}

export async function changePassword(context: Context, currentPassword: string, newPassword: string): Promise<UserChangeResponse> {
  const url: URL = new URL('/rest/io/customer/password/', context.config.api.url);
  const { data } = await context.client.post(url.href, {
    oldPassword: currentPassword,
    password: newPassword,
    password2: newPassword
  });
  return data;
}

/* billingAddress: {
      name2: params.firstName,
      name3: params.lastName,
      address1: 'address1',
      address2: 'address2',
      postalCode: 'postalCode',
      town: 'town',
      countryId: '1'
    } */
