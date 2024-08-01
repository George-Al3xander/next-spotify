"use client";

import React from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn, parseSearchTab } from "@/lib/utils";
import { searchTabVariants } from "@/constants/data";
import { TSearchTabVariant } from "@/types/types";

function SearchTabButtons() {
    const searchParams = useSearchParams();

    const searchTab = parseSearchTab(searchParams);
    const searchQuery = searchParams.get("searchQuery");
    if (!searchQuery) return null;
    return (
        <ScrollArea className={"max-w-full"}>
            <ul className="o flex items-center gap-2">
                {searchTabVariants.map((variant: TSearchTabVariant) => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set("searchTab", variant);
                    return (
                        <li key={variant + "-li"}>
                            <Button
                                size="sm"
                                variant="secondary"
                                className={cn(
                                    "rounded-xl bg-background px-6 capitalize hover:cursor-pointer",
                                    {
                                        "pointer-events-none bg-white text-black":
                                            variant === searchTab,
                                    },
                                )}
                                key={variant}
                                asChild
                            >
                                <Link href={`?${newSearchParams.toString()}`}>
                                    {variant}
                                </Link>
                            </Button>
                        </li>
                    );
                })}
            </ul>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export default SearchTabButtons;
