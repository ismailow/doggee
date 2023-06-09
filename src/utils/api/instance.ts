import { ApiResponse } from '../hooks/api/types';

type BaseUrl = string;
const baseUrl: BaseUrl = 'http://localhost:3001/';

export class API {
  readonly baseUrl: string;

  constructor(url: BaseUrl) {
    this.baseUrl = url;
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
      // credentials: 'same-origin',
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(response);

    const responseData = (await response.json()) as ApiResponse<T>;
    console.log(responseData);

    return {
      data: responseData,
      status: response.status,
    };
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: T, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }
}

export const api = new API(baseUrl);
