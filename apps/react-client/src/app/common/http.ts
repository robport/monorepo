const TOKEN_KEY = 'monorepo-token';

const headers = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
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
  const result = await fetch(uri(resource), {
    headers: headers(),
    method: 'GET'
  });
  if (result.ok) {
    return result.json();
  }
  throw new Error(result.statusText);
};

export const httpDeleteOne = async (resource: string, id: number) => {
  return httpDelete(`${resource}/delete/${id}`);
};

export const httpDelete = async (resource: string)
  : Promise<any> => {
  const result = await fetch(uri(resource), {
    headers: headers(),
    method: 'DELETE'
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
};

export const httpPost = async (resource: string, data: any)
  : Promise<any> => {
  const result = await fetch(uri(resource), {
    headers: headers(),
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (result.ok) {
    return result.json();
  }
  throw new Error(result.statusText);
};
