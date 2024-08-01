"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/data";

function Nav() {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex items-start justify-between gap-4 font-semibold sm:flex-col">
                {navLinks.map(({ title, href, Icon, IconActive }) => {
                    const CurrentIcon = href === pathname ? IconActive : Icon;

                    return (
                        <li key={href}>
                            <Link
                                className={cn(
                                    "flex flex-col items-center gap-4 transition-all hover:text-white sm:flex-row",
                                    {
                                        "pointer-events-none text-white":
                                            href === pathname,
                                    },
                                )}
                                href={href}
                            >
                                <CurrentIcon size={25} />
                                {title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Nav;
