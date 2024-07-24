import { Account, User, type NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

import spotifyApi from '@/lib/spotify';

const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    // 'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
    // 'playlist-modify-private',
    // 'playlist-modify-public',
    'user-follow-read',
].join(',');

const options: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`,
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
            profileUrl: 'dsdasd',
        }),
    ],

    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.access_token = account.access_token;
            }

            if (profile) {
                //@ts-ignore
                token.profileUrl = profile.external_urls.spotify;
            }

            return token;
        },
        async session({ session, token }) {
            if ('access_token' in token) {
                const accessToken = token.access_token as string;
                spotifyApi.setAccessToken(accessToken);
            }

            return {
                ...session,
                token,
            };
        },
    },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
