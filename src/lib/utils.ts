import { authOptions } from "@/constants/authOptions";
import { searchTabVariants } from "@/constants/data";
import spotifyApi from "@/lib/spotify";
import { Response, TSearchTabVariant } from "@/types/types";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const displayTrackLength = (duration_ms: number) => {
    const date = new Date(duration_ms);
    const seconds = date.getSeconds();
    return `${date.getMinutes()}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

export const generateSearchOptions = (str: string | null) => {
    const nextUrl = new URL(str || "");

    const offset = Number(nextUrl.searchParams.get("offset") || "0");
    const limit = Number(nextUrl.searchParams.get("limit") || "20");

    return { offset, limit };
};

export const searchItemsDynamically = async ({
    options,
    itemVariant,
    query,
}: {
    itemVariant: TSearchTabVariant;
    query: string;
    options: { offset: number; limit: number };
}): Promise<Response<SpotifyApi.SearchResponse>> => {
    const functionPath =
        `search${itemVariant[0].toUpperCase()}${itemVariant.substring(1)}` as "searchTracks";
    return await spotifyApi[functionPath](query, options);
};

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";
export async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const basicAuth = Buffer.from(
            `${
                process.env.SPOTIFY_CLIENT_ID || ""
            }:${process.env.SPOTIFY_CLIENT_SECRET || ""}`,
        ).toString("base64");
        const { data } = await axios.post(
            SPOTIFY_REFRESH_TOKEN_URL,
            {
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            },
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        return {
            ...token,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpires: Date.now() + data.expires_in * 1000,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const provideTokenServer = async () => {
    const session = await getServerSession(authOptions);
    if (session?.error === "RefreshAccessTokenError") {
        //TODO: need to handle such error globally
        return redirect("/api/auth/signin");
    }
    spotifyApi.setAccessToken(session!.accessToken || "");
};

export const shouldRefresh = (expires: string): boolean => {
    const startDate = new Date();

    const endDate = new Date(expires);
    const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    return seconds < 300;
};

export const parseSearchTab = (
    params: URLSearchParams | TSearchTabVariant | undefined,
    backupValue: TSearchTabVariant | undefined = "all",
): TSearchTabVariant => {
    if (!params) params = backupValue;

    let searchTab: TSearchTabVariant = backupValue;

    if (params instanceof URLSearchParams)
        searchTab = (params.get("searchTab") as "tracks") || backupValue;
    else searchTab = params;

    if (!searchTabVariants.includes(searchTab.toLowerCase() as "all"))
        return backupValue;

    return searchTab;
};

export const generateItemTitle = ({
    playingStatus,
    name,
    ...props
}: {
    name: string;
    playingStatus: boolean;
    owner?: SpotifyApi.PlaylistObjectSimplified["owner"];
    artists?: SpotifyApi.AlbumObjectSimplified["artists"];
}) => {
    let authors: string | undefined = undefined;

    let title = `${playingStatus ? "Stop playing" : "Play"} ${name}`;

    if ("artists" in props) {
        if (props.artists)
            authors = props.artists.map(({ name }) => name).join(", ");
    }
    if ("owner" in props) {
        if (props.owner) authors = props.owner.display_name;
    }

    if (authors) {
        title = `${title} by ${authors}`;
    }
    return title;
};
