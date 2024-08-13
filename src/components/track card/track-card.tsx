"use client";

import usePlay from "@/hooks/use-play";
import useProvideToken from "@/hooks/use-provide-token";
import Link from "next/link";
import { Fragment } from "react";
import { MdExplicit } from "react-icons/md";

import TrackCover from "@/components/track card/track-cover";
import TrackDdMenu from "@/components/track card/track-dd-menu";
import TrackIndex from "@/components/track card/track-index";
import { cn, displayTrackLength, generateItemTitle } from "@/lib/utils";

function TrackCard({
    name,
    uri,
    explicit,
    album,
    artists,
    duration_ms,
    id,
    index,
    external_urls: { spotify },
}: SpotifyApi.TrackObjectFull & { index?: number }) {
    useProvideToken();

    const playProps = usePlay(uri, id);
    const { togglePlay, isCurrent, isCurrentlyPlaying } = playProps;
    const title = generateItemTitle({
        name,
        playingStatus: isCurrentlyPlaying,
        artists,
    });

    return (
        <li
            className="group/track-card flex items-center gap-4 rounded-lg bg-black bg-opacity-0 p-2 text-sm transition-all focus-within:bg-opacity-40 hover:bg-opacity-40"
            onDoubleClick={() => togglePlay(false)}
        >
            <TrackIndex index={index} title={title} {...playProps} />
            <TrackCover
                title={title}
                withIndex={Boolean(index)}
                images={album.images}
                {...playProps}
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
