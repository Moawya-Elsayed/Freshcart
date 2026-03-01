const BASE_URL = process.env.NEXT_PUBLIC_API;

export async function apiRequest<T>(
  endpoint: string,
  method: string,
  body?: T,
  token?: string  
) {
    if (!BASE_URL) {
      throw new Error("API Base URL is not defined");
    }

  const url = `${BASE_URL}${endpoint}`;
  console.log("API CALL:", url);

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      // ...(token && { token }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  try {
    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch {
    throw new Error("Server returned non-JSON response");
  }
}