const BASE_URL = "http://localhost:5000/api";

export async function apiFetch(endPoint: string, options: RequestInit = {}) {
  let response = await fetch(`${BASE_URL}${endPoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      response = await fetch(`${BASE_URL}${endPoint}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
    } else {
      // Refresh failed → logout
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  if (!response.ok) {
    window.location.href = "/login";
    throw new Error("Request Failed");
  }

  return response.json();
}
