import { Loginschemtype, Registerschemtype } from '@/schema/zodSchema';
import { poster } from './apiHelper';

interface LoginPayload extends Loginschemtype {
    mode: string;
}

export const login = (credentials: Loginschemtype) => {
    const payload: LoginPayload = {
        ...credentials,
        mode: 'session',
    };
    return poster('auth/login', payload);
};

export const logout = () => {
    const payload = {
        mode: 'session',
    };
    return poster('auth/logout', payload);
};


export const register = (userData: Registerschemtype) => {
    return poster('users/register', userData);
};
