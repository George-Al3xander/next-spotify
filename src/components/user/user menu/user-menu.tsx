"use client";

import React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useRecoilValue } from "recoil";

import UserDrawerMenu from "@/components/user/user menu/user-drawer-menu";
import UserDropdownMenu from "@/components/user/user menu/user-dropdown-menu";
import { $user } from "@/state/atoms/atoms";

function UserMenu() {
    const user = useRecoilValue($user);

    const isDesktop = useMediaQuery("(min-width: 640px)");

    if (!user) throw new Error("no user provided");

    // TODO: provide user's profile url: menuOptions.account.href = session.token.profileUrl;

    if (isDesktop) return <UserDropdownMenu {...user} />;

    return <UserDrawerMenu {...user} />;
}

export default UserMenu;
