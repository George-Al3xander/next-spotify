import { useEffect } from "react";

import { signIn } from "next-auth/react";
import { useRecoilValue } from "recoil";

import spotifyApi from "@/lib/spotify";
import { shouldRefresh } from "@/lib/utils";
import { $accessToken, $expires } from "@/state/atoms/atoms";

const useProvideToken = () => {
    const accessToken = useRecoilValue($accessToken);
    const expires = useRecoilValue($expires);

    useEffect(() => {
        if (shouldRefresh(expires)) {
            signIn();
        }
    }, [expires]);

    spotifyApi.setAccessToken(accessToken || "");
};

export default useProvideToken;
