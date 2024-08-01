import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { refreshAccessToken } from "@/lib/utils";

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    // 'user-library-modify',
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    // 'playlist-modify-private',
    // 'playlist-modify-public',
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-follow-read",
].join(",");

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`,
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
        }),
    ],

    callbacks: {
        async jwt({ token, account, user, profile }) {
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    //refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at * 1000,
                    user: { ...user, profileUrl: user },
                };
            }
            if (
                token.accessTokenExpires &&
                Date.now() < token.accessTokenExpires
            ) {
                return token;
            }
            return await refreshAccessToken(token);
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            //session.refreshToken = token.refreshToken;
            session.error = token.error;
            session.user = token.user;

            return session;
        },
    },
};
