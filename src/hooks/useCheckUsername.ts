import { useEffect, useState } from "react";
import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";

function useCheckUsername(username: string | null) {
    const [isTaken, setIsTaken] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const checkUsername = async () => {
            if (!username) {
                setIsTaken(null);
                return;
            }

            setLoading(true);
            try {
                const response = await fetcher<{ data: User[] }>(`users?filter[first_name][_eq]=${username}`);
                console.log(response.data.length);

                if (response.data.length > 0) {
                    setIsTaken(true)
                    setLoading(false);
                    return { isTaken, loading };
                }
                setIsTaken(false);
            } catch (error) {
                console.error("Error checking username:", error);
                setIsTaken(null);
            } finally {
                setLoading(false);
            }
        };

        checkUsername();
    }, [username]);

    return { isTaken, loading };
}

export default useCheckUsername;
