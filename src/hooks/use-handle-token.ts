"use client";

import { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

import {
    $accessToken,
    $expires,
    $refreshToken,
    $user,
} from "@/state/atoms/atoms";

const useHandleToken = () => {
    const { data: session, status } = useSession();
    const [customStatus, setCustomStatus] = useState<
        "authenticated" | "loading" | "unauthenticated"
    >("loading");
    const setAccessToken = useSetRecoilState($accessToken);
    const setUser = useSetRecoilState($user);
    const setExpires = useSetRecoilState($expires);
    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signIn(); // Force sign in to hopefully resolve error
        }
    }, [session]);

    useEffect(() => {
        if (status !== "loading" && session && status === "authenticated") {
            if (
                "accessToken" in session! &&
                session.accessToken !== undefined
            ) {
                const { accessToken, user, expires } = session;
                setAccessToken(accessToken);
                if (user) {
                    setUser(user);
                } else {
                    throw new Error("User not provided");
                }
                setExpires(expires);
            }
            setCustomStatus(status);
        }
    }, [status]);

    return { status: customStatus };
};

export default useHandleToken;
