"use client";

import React from "react";
import { IconType } from "react-icons";

import { signOut } from "next-auth/react";

function LogoutBtn({
    tag: Tag,
    startIcon: StartIcon,
    endIcon: EndIcon,
    className,
}: {
    tag: keyof HTMLElementTagNameMap | JSX.ElementType;
    startIcon?: IconType;
    endIcon?: IconType;
    className?: React.ComponentProps<"div">["className"];
}) {
    return (
        <Tag className={className} onClick={() => signOut()}>
            {StartIcon && <StartIcon />}
            Log Out
            {EndIcon && <EndIcon />}
        </Tag>
    );
}

export default LogoutBtn;
