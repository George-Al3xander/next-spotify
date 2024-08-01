"use client";

import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroll-component";

import useAdvancedParams from "@/hooks/use-advanced-params";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { nanoid } from "nanoid";

import SpotifySuspenseSkeleton from "@/components/skeletons/spotify-suspense-skeleton";
import TrackCard from "@/components/track card/track-card";
import VerticalPreviewCard from "@/components/vertical-preview-card";
import { cn, searchItemsDynamically } from "@/lib/utils";
import { TSearchTabVariant } from "@/types/types";

function ScrollList() {
    const { searchQuery: query, searchTab } = useAdvancedParams();

    const getItems = async (options: { offset: number; limit: number }) => {
        const res = await searchItemsDynamically({
            query,
            itemVariant: currentTab,
            options,
        });
        return res.body[`${currentTab as Exclude<TSearchTabVariant, "all">}`]!;
    };

    const { items, currentTab, isLoading, ...opts } = useInfiniteScroll<
        | SpotifyApi.PlaylistObjectSimplified
        | SpotifyApi.ArtistObjectFull
        | SpotifyApi.AlbumObjectSimplified
        | SpotifyApi.TrackObjectFull
    >(getItems);

    if (isLoading)
        return (
            <SpotifySuspenseSkeleton
                count={20}
                withSuspense={false}
                withTitle={false}
                type={currentTab as "tracks"}
            />
        );

    if (items.length === 0 || !items)
        return (
            <section className="my-10 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white">
                    No results found for &quot;
                    {query}&quot;
                </h2>
                <p>
                    Please make sure your words are spelled correctly or use
                    less or different keywords.
                </p>
            </section>
        );
    return (
        <InfiniteScroll
            {...opts}
            loader={
                <span className="flex w-full items-center justify-center py-10 text-spotify">
                    <HiDotsHorizontal
                        className="mx-auto animate-pulse"
                        size={40}
                    />
                </span>
            }
        >
            <ul
                className={cn({
                    "grid overflow-x-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5":
                        searchTab != "tracks",
                })}
            >
                {items.map((item) => {
                    const key = `${nanoid()}-${item.id}`;

                    if (searchTab === "tracks" && item.type === "track") {
                        return <TrackCard key={key} {...item} />;
                    }

                    return <VerticalPreviewCard key={key} {...item} />;
                })}
            </ul>
        </InfiniteScroll>
    );
}

export default ScrollList;
