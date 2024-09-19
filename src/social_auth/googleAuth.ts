import { NextRouter } from "next/router";

export const googleLogin = async (router: NextRouter) => {

    router.push(
        `${process.env.NEXT_PUBLIC_API}/auth/login/google?redirect=http://localhost:3000`
    );
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({
            mode: "session",
        }),
    });
};