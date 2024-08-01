import { User } from "next-auth";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const $isPlaying = atom<boolean>({
    key: "player_playing_status",
    default: false,
});

export const $currentUri = atom<string | undefined>({
    key: "current_uri",
    effects_UNSTABLE: [persistAtom],
    default: undefined,
});

export const $currentId = atom<string>({
    key: "current_track_id",
    default: undefined,
});

export const $user = atom<User | undefined>({
    key: "current_user",
    default: undefined,
});

export const $accessToken = atom<string | undefined>({
    key: "access_token",
    default: undefined,
});

export const $refreshToken = atom<string | undefined>({
    key: "refresh_token",
    default: undefined,
});

export const $expires = atom<string>({
    key: "token_expires",
    default: new Date().toISOString(),
});

export const $originUri = atom<string | undefined>({
    key: "origin_uri",
    default: undefined,
});
