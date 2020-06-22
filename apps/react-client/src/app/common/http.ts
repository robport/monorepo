import { AuthError } from '@monorepo/data';

const TOKEN_KEY = 'monorepo-token';

const headers = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const uri = (resource: string) => `/api/${resource}`;

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const httpLogin = async (username: string, password: string) => {
  const token = await httpPost('auth/login', {
    username: username,
    password: password
  });
  if (!token.access_token) {
    throw new Error('No token');
  }
  localStorage.setItem(TOKEN_KEY, token.access_token);
};

export const httpLogout = async () => {
  await httpGet('auth/logout');
  localStorage.removeItem(TOKEN_KEY);
};

export const httpGetOne = async (resource: string, id: number)
  : Promise<any> => {
  return httpGet(`${resource}/${id}`);
};

export const httpGet = async (resource: string)
  : Promise<any> => {
  const response = await fetch(uri(resource), {
    headers: headers(),
    method: 'GET'
  });
  return handleResponse(response);
};

export const httpDeleteOne = async (resource: string, id: number) => {
  return httpDelete(`${resource}/delete/${id}`);
};

export const httpDelete = async (resource: string)
  : Promise<any> => {
  const response = await fetch(uri(resource), {
    headers: headers(),
    method: 'DELETE'
  });
  return await handleResponse(response);
};

export const httpPost = async (resource: string, data: any)
  : Promise<any> => {
  const response = await fetch(uri(resource), {
    headers: headers(),
    method: 'POST',
    body: JSON.stringify(data)
  });
  return await handleResponse(response);
};

const handleResponse = async (response: Response) => {
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    }
  } else {
    const errorBody = await response.json();
    if (errorBody) {
      const authError: AuthError = errorBody.message;
      if ([AuthError.INVALID_TOKEN,
        AuthError.SESSION_EXPIRED].includes(authError)) {
        localStorage.removeItem(TOKEN_KEY);
      }
      throw new Error(errorBody.message);
    }
    throw new Error(response.statusText);
  }
};
