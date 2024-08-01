import React from "react";

import Link from "next/link";

import TrackCard from "@/components/track card/track-card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import VerticalPreviewCard from "@/components/vertical-preview-card";
import { cn, provideTokenServer, searchItemsDynamically } from "@/lib/utils";
import { TSearchTabVariant } from "@/types/types";

async function SearchItems({
    searchParams,
    variant,
}: {
    variant: TSearchTabVariant;
    searchParams: {
        searchQuery?: string;
        searchTab?: TSearchTabVariant;
    };
}) {
    await provideTokenServer();
    const { searchQuery, searchTab = "all" } = searchParams;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("searchTab", variant);
    const items = await searchItemsDynamically({
        query: searchQuery || "",
        itemVariant: variant,
        options: { limit: 5, offset: 0 },
    });

    const newItems = items.body[`${variant as "tracks"}`]!;

    if (!newItems) return null;
    return (
        <section>
            <Button
                className="my-4 text-2xl font-bold capitalize text-white"
                asChild
                variant={"link"}
            >
                <Link href={`?${newParams.toString()}`}>{variant}</Link>
            </Button>
            <ScrollArea className="z-10">
                <ScrollBar className="z-10" orientation="horizontal" />
                <ul
                    className={cn({
                        "flex flex-col justify-between gap-4 sm:flex-row":
                            variant !== "tracks",
                    })}
                >
                    {newItems.items.map((track) => {
                        if (variant === "tracks") {
                            return <TrackCard key={track.id} {...track} />;
                        }

                        return <VerticalPreviewCard {...track} />;
                    })}
                </ul>
            </ScrollArea>
        </section>
    );
}

export default SearchItems;
