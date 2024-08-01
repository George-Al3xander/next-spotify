"use client";

import React from "react";

import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const buttons: {
    path: "forward" | "back";
    Icon: LucideIcon;
}[] = [
    { path: "back", Icon: ChevronLeft },
    { path: "forward", Icon: ChevronRight },
];

function BackForwardButtons() {
    const router = useRouter();

    return (
        <ul className="hidden gap-2 sm:flex">
            {buttons.map(({ path, Icon }) => (
                <li key={path + "-li"}>
                    <Button
                        className="h-8 w-8 rounded-full bg-black bg-opacity-70 text-white hover:cursor-pointer disabled:cursor-not-allowed"
                        size={"icon"}
                        variant="secondary"
                        onClick={router[path]}
                        key={path}
                    >
                        <span className="sr-only">{`Go ${path}`}</span>
                        <Icon className="h-6 w-6" />
                    </Button>
                </li>
            ))}
        </ul>
    );
}

export default BackForwardButtons;
