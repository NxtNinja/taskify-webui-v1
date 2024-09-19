// api/authApi.ts
import { Loginschemtype, Registerschemtype } from '@/schema/zodSchema';
import { fetcher, poster } from './apiHelper';

interface LoginPayload extends Loginschemtype {
    mode: string;
}

// Function to handle user login
export const login = (credentials: Loginschemtype) => {
    const payload: LoginPayload = {
        ...credentials,
        mode: 'session',
    };
    return poster('auth/login', payload);
};
// Function to handle user login
export const logout = () => {
    const payload = {
        mode: 'session',
    };
    return poster('auth/logout', payload);
};

// Function to handle user registration
export const register = (userData: Registerschemtype) => {
    return poster('users/register', userData);
};
