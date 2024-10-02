import ky from 'ky';

const apiUrl = process.env.NEXT_PUBLIC_API as string;

const api = ky.create({
    prefixUrl: apiUrl,
    mode: "cors",
    credentials: "include",
});

export const fetcher = async <T>(endpoint: string): Promise<T> => {
    return api.get(endpoint).json<T>();
};

export const poster = async <T>(
    endpoint: string,
    data: T,
    options?: Partial<RequestInit>
) => {
    return api.post(endpoint, { json: data, ...options }).json();
};

export const patcher = async <T>(
    endpoint: string,
    data: T,
    options?: Partial<RequestInit>
) => {
    return api.patch(endpoint, { json: data, ...options }).json();
};

export const deleter = async (
    endpoint: string,
) => {
    return api.delete(endpoint);
};
