'use client';

import React from 'react';

import { ExternalLink } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user/user-avatar';

const menuOptions: Record<string, { href: string; isExternal?: boolean }> = {
    account: {
        href: '/',
        isExternal: true,
    },
    support: {
        href: 'https://support.spotify.com/ua-en/',
        isExternal: true,
    },
    download: {
        href: 'https://www.spotify.com/de-en/download/other/',
        isExternal: true,
    },
};

function UserDropdownMenu() {
    const { data: session, status } = useSession();

    if (status === 'loading')
        return (
            <span className="h-8 w-8 animate-pulse rounded-full bg-primary" />
        );
    if (!session) redirect('/api/auth/signin');

    const { user } = session;
    if (!user) throw new Error('no user provided');
    const { name, image } = user;

    //@ts-ignore
    menuOptions.account.href = session.token.profileUrl;
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <UserAvatar src={image} name={name || 'u'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.keys(menuOptions).map((key) => {
                    const { href, isExternal = false } = menuOptions[key];

                    return (
                        <DropdownMenuItem
                            disabled={!href}
                            className="capitalize"
                            key={key}
                            asChild
                        >
                            <Link
                                className="flex items-center justify-between gap-2"
                                href={href || ''}
                                target={'_blank'}
                            >
                                {key}
                                {isExternal && (
                                    <ExternalLink className="h-4 w-4" />
                                )}
                            </Link>
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserDropdownMenu;
