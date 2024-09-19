// api/apiHelper.ts
import ky from 'ky';

// Fetch the API base URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API as string;  // Ensure it's treated as a string

// Define the API instance with base URL and headers
const api = ky.create({
    prefixUrl: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    mode: "cors",
    credentials: "include",
    timeout: 10000,  // Timeout after 10 seconds
});

// Type for GET requests with a generic response type
export const fetcher = async <T>(endpoint: string): Promise<T> => {
    return api.get(endpoint).json<T>();
};

// Type for POST requests with generic request and response types
export const poster = async <T>(
    endpoint: string,
    data: T,
    options?: Partial<RequestInit> // Additional options (e.g., headers)
) => {
    return api.post(endpoint, { json: data, ...options }).json();
};

export const patcher = async <T>(
    endpoint: string,
    data: T,
    options?: Partial<RequestInit> // Additional options (e.g., headers)
) => {
    return api.patch(endpoint, { json: data, ...options }).json();
};

export const deleter = async (
    endpoint: string,
) => {
    return api.delete(endpoint);
};
