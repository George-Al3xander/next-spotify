'use client';

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const buttons: {
    path: 'forward' | 'back';
    Icon: LucideIcon;
}[] = [
    { path: 'back', Icon: ChevronLeft },
    { path: 'forward', Icon: ChevronRight },
];

function BackForwardButtons() {
    const router = useRouter();
    const referrer = document.referrer;

    return (
        <ul className="flex gap-2">
            {buttons.map(({ path, Icon }) => (
                <Button
                    disabled={Boolean(
                        process.env.NEXT_PUBLIC_NEXTAUTH_URL &&
                            !referrer.includes(
                                process.env.NEXT_PUBLIC_NEXTAUTH_URL,
                            ),
                    )}
                    className="h-8 w-8 rounded-full bg-black bg-opacity-70 text-white hover:cursor-pointer disabled:cursor-not-allowed"
                    size={'icon'}
                    variant="secondary"
                    onClick={router[path]}
                    key={path}
                >
                    <span className="sr-only">{`Go ${path}`}</span>
                    <Icon className="h-6 w-6" />
                </Button>
            ))}
        </ul>
    );
}

export default BackForwardButtons;
