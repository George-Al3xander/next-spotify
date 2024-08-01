import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";

import { User } from "next-auth";
import Link from "next/link";

import LogoutBtn from "@/components/logout-btn";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "@/components/user/user menu/nav-items";
import UserAvatar from "@/components/user/user-avatar";
import { cn } from "@/lib/utils";
import { menuOptions } from "@/constants/data";

function UserDrawerMenu({ image, name }: User) {
    return (
        <Sheet>
            <SheetTrigger>
                <UserAvatar src={image} name={name || "u"} />
            </SheetTrigger>
            <SheetContent className="px-0" side={"left"}>
                <SheetHeader className="flex flex-row items-center gap-4 px-4">
                    <UserAvatar
                        imageClassName="h-12 w-12"
                        src={image}
                        name={name || "U"}
                    />
                    <div className="my-auto text-left">
                        <h1 className="text-xl font-bold text-white">
                            {name || "U"}
                        </h1>
                        <p className="text-sm"> View profile</p>
                    </div>
                </SheetHeader>
                <Separator className="my-4" />

                <ul className={"flex flex-col gap-4 px-4"}>
                    <NavItems />
                    {Object.keys(menuOptions).map((key) => {
                        const {
                            href,
                            isExternal = false,
                            Icon,
                        } = menuOptions[key];
                        return (
                            <li key={key}>
                                <Link
                                    className={cn(
                                        "flex items-center gap-4 capitalize transition-all hover:text-white sm:flex-row",
                                        {
                                            "pointer-events-none opacity-60":
                                                !href,
                                        },
                                    )}
                                    target={"_blank"}
                                    href={href || ""}
                                >
                                    <Icon size={18} />
                                    {key}
                                    {isExternal && (
                                        <FaExternalLinkAlt size={12} />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                    <LogoutBtn
                        className={
                            "flex items-center gap-4 capitalize transition-all hover:text-white sm:flex-row"
                        }
                        startIcon={CiLogout}
                        tag={"li"}
                    />
                </ul>
            </SheetContent>
        </Sheet>
    );
}

export default UserDrawerMenu;
