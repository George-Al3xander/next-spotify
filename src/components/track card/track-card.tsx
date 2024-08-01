"use client";

import React, { Fragment } from "react";
import { MdExplicit } from "react-icons/md";

import usePlay from "@/hooks/use-play";
import useProvideToken from "@/hooks/use-provide-token";
import Link from "next/link";

import SpotifyElementSkeleton from "@/components/skeletons/spotify-element-skeleton";
import TrackCover from "@/components/track card/track-cover";
import TrackDdMenu from "@/components/track card/track-dd-menu";
import { cn, displayTrackLength } from "@/lib/utils";

const textStyles =
    "w-[10ch] overflow-hidden text-ellipsis text-nowrap md:w-[20ch] lg:w-auto";
function TrackCard({
    name,
    uri,
    explicit,
    album,
    artists,
    duration_ms,
    id,
    external_urls: { spotify },
}: SpotifyApi.TrackObjectFull) {
    useProvideToken();
    const { togglePlay, isCurrent, isCurrentlyPlaying } = usePlay(uri, id);
    const title = `${name} by ${artists.map(({ name }) => name).join(", ")}`;

    let url: string | undefined;
    if (album.images !== undefined && "images" in album) {
        if (Array.isArray(album.images)) {
            url = album.images[0].url;
        }
        if (typeof album.images === "string") {
            url = album.images;
        }
    }

    return (
        <li
            className="group/track-card flex items-center gap-4 rounded-lg p-2 text-sm transition-all hover:bg-secondary"
            onDoubleClick={() => togglePlay(false)}
        >
            <TrackCover
                playTrack={togglePlay}
                imageSrc={url}
                title={title}
                isPlaying={isCurrentlyPlaying}
            />
            <div className="w-full">
                <div className="ellipsis">
                    <span
                        className={cn("font-semibold text-white", {
                            "text-spotify": isCurrent,
                        })}
                    >
                        {name}
                    </span>
                </div>

                <div className="ellipsis">
                    <span>
                        {explicit && (
                            <MdExplicit
                                size={16}
                                className="inline"
                                title={"Explicit"}
                            />
                        )}{" "}
                        {artists.map((artist, index) => (
                            <Fragment key={artist.id + "-fragment"}>
                                <Link
                                    className="cursor-pointer hover:text-white"
                                    key={artist.id}
                                    href={`/artists/${artist.id}`}
                                >
                                    {artist.name}
                                </Link>
                                {index !== artists.length - 1 && ", "}
                            </Fragment>
                        ))}
                    </span>
                </div>
            </div>
            <time
                className="ml-auto hidden sm:inline"
                dateTime={displayTrackLength(duration_ms)}
            >
                {displayTrackLength(duration_ms)}
            </time>
            <TrackDdMenu
                uri={uri}
                title={title}
                artists={artists}
                externalUrl={spotify}
                album={album}
            />
        </li>
    );
}

export default TrackCard;
