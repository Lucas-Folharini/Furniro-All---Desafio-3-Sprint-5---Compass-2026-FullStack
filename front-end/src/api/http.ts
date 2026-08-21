export const API_BASE_URL = "http://localhost:3000";

type ApiFetchOptions = RequestInit & { params?: object };

export async function apiFetch<T>(
  path: string,
  options?: ApiFetchOptions,
): Promise<T> {
  const { params, ...requestOptions } = options ?? {};
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  const response = await fetch(url, { ...requestOptions });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
