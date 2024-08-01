import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

import Link from "next/link";

import LogoutBtn from "@/components/logout-btn";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user/user-avatar";
import { menuOptions } from "@/constants/data";

function UserDropdownMenu({
    image,
    name,
}: {
    image?: string | null;
    name?: string | null;
}) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <UserAvatar src={image} name={name || "u"} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.keys(menuOptions).map((key) => {
                    const { href, isExternal = false, Icon } = menuOptions[key];

                    return (
                        <DropdownMenuItem
                            disabled={!href}
                            className="capitalize"
                            key={key}
                            asChild
                        >
                            <Link
                                className="flex items-center justify-between gap-2"
                                href={href || ""}
                                target={"_blank"}
                            >
                                <Icon size={18} />
                                {key}
                                {isExternal && <FaExternalLinkAlt size={12} />}
                            </Link>
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <LogoutBtn tag={DropdownMenuItem} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserDropdownMenu;
