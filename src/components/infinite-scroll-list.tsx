"use client";

import { HiDotsHorizontal } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroll-component";

import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { nanoid } from "nanoid";

import SpotifySuspenseSkeleton from "@/components/skeletons/spotify-suspense-skeleton";
import TrackCard from "@/components/track card/track-card";
import VerticalPreviewCard from "@/components/vertical-preview-card";
import { cn } from "@/lib/utils";
import { PagingObject } from "@/types/types";
import { ReactNode } from "react";

function ScrollList({
    getItems,
    type,
    noResultsMessage,
}: {
    getItems: ({
        offset,
        limit,
    }: {
        offset: number;
        limit: number;
    }) => Promise<
        PagingObject<
            | SpotifyApi.PlaylistObjectSimplified
            | SpotifyApi.ArtistObjectFull
            | SpotifyApi.AlbumObjectSimplified
            | SpotifyApi.TrackObjectFull
        >
    >;
    type: "playlists" | "artists" | "albums" | "tracks";
    noResultsMessage?: ReactNode;
}) {
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

    if ((items.length === 0 || !items) && noResultsMessage)
        return noResultsMessage;
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
                        type != "tracks",
                })}
            >
                {items.map((item) => {
                    const key = `${nanoid()}-${item.id}`;
                    console.log(item.type);
                    if (type === "tracks" && item.type === "track") {
                        return <TrackCard key={key} {...item} />;
                    }
                    //@ts-ignore
                    return <VerticalPreviewCard key={key} {...item} />;
                })}
            </ul>
        </InfiniteScroll>
    );
}

export default ScrollList;
