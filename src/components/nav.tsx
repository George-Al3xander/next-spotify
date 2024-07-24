'use client';

import React from 'react';

import { House, LucideIcon, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const links: { title: string; href: string; Icon: LucideIcon }[] = [
    { title: 'Home', href: '/', Icon: House },
    { title: 'Search', href: '/search', Icon: Search },
];

function Nav() {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex flex-col items-start gap-4">
                {links.map(({ title, href, Icon }) => (
                    <li key={href}>
                        <Link
                            className={cn(
                                'flex gap-4 transition-all hover:text-white',
                                {
                                    'pointer-events-none text-white':
                                        href === pathname,
                                },
                            )}
                            href={href}
                        >
                            <Icon />
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
