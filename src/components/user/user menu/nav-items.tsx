"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/data";

function NavItems() {
    const pathname = usePathname();
    return (
        <>
            {navLinks.map(({ title, href, Icon, IconActive }) => {
                const CurrentIcon = href === pathname ? IconActive : Icon;
                return (
                    <li key={href}>
                        <SheetClose asChild>
                            <Link
                                className={cn(
                                    "flex items-center gap-4 transition-all hover:text-white sm:flex-row",
                                    {
                                        "pointer-events-none border-r-4 border-white text-white":
                                            href === pathname,
                                    },
                                )}
                                href={href}
                            >
                                <CurrentIcon />
                                {title}
                            </Link>
                        </SheetClose>
                    </li>
                );
            })}
        </>
    );
}

export default NavItems;
