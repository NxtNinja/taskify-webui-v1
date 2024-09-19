// hooks/useAuth.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, register } from '../helper/authApi';
import { Loginschemtype, Registerschemtype } from '@/schema/zodSchema';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

// Hook for login
export const useLogin = (): UseMutationResult<unknown, Error, Loginschemtype> => {
    const router = useRouter();
    return useMutation({
        mutationFn: (credentials: Loginschemtype) => login(credentials),
        onSuccess: async () => {
            toast.success("Welcome back...");

            router.push("/")
        }
    });
};

// Hook for registration
export const useRegister = (): UseMutationResult<unknown, Error, Registerschemtype> => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: Registerschemtype) => register(userData),
        onSuccess: async () => {
            router.push("/auth/signin")
        }
    });
};

