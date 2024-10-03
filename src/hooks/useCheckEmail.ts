import { useEffect, useState } from "react";
import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";

const useCheckEmail = (email: string | null) => {
  const [isEmailTaken, setIsTaken] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUsername = async () => {
      if (!email) {
        setIsTaken(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetcher<{ data: User[] }>(
          `users?filter[email][_eq]=${email}`
        );
        console.log(response.data.length);

        if (response.data.length > 0) {
          setIsTaken(true);
          setLoading(false);
          return { isEmailTaken, isLoading };
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
  }, [email]);

  return { isEmailTaken, isLoading };
};

export default useCheckEmail;
