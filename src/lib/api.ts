const BASE_URL = "http://localhost:5000/api";

export async function apiFetch(endPoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endPoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error("Request Failed");
  }

  return response.json();
}
