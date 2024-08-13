"use client";

import usePlay from "@/hooks/use-play";
import Link from "next/link";

import PlayPauseIcon from "@/components/play-pause-icon";
import SpotifyImage from "@/components/utils/spotify-image";
import { cn, generateItemTitle } from "@/lib/utils";

import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

function VerticalPreviewCard({
    id,
    uri,
    type,
    name,
    images,
    cardVariant = "responsive",
    ...props
}: (ArtistObjectFull | AlbumObjectSimplified | PlaylistObjectSimplified) & {
    cardVariant?: "responsive" | "vertical" | "horizontal";
}) {
    const { togglePlay, isPlayingOrigin } = usePlay(uri, id);
    const title = generateItemTitle({
        name,
        playingStatus: isPlayingOrigin,
        ...props,
    });

    return (
        <Link href={`/${type}s/${id}`}>
            <div
                onDoubleClick={() => togglePlay(false)}
                title={title}
                className={cn(
                    "group/vertical-card relative flex w-full basis-full items-center gap-4 rounded-lg p-2 transition-all hover:bg-background",
                    {
                        "sm:mx-auto sm:w-[12.5rem] sm:flex-col sm:items-start sm:gap-2":
                            cardVariant === "responsive",
                        "mx-auto w-[12.5rem] flex-col items-start gap-2":
                            cardVariant === "vertical",
                    },
                )}
            >
                <span
                    className={cn(
                        "aspect-square max-h-[6rem] min-h-[6rem] min-w-[6rem] max-w-[6rem] overflow-hidden rounded-lg bg-background sm:mx-auto sm:max-h-[11rem] sm:min-h-[11rem] sm:min-w-[11rem] sm:max-w-[11rem]",
                        {
                            "rounded-full": type === "artist",
                        },
                    )}
                >
                    <SpotifyImage
                        type={type === "artist" ? "person" : "music"}
                        images={images}
                        imageProps={{
                            className: "h-full w-full object-cover",
                            width: 200,
                            height: 200,

                            alt: `${name}'s cover`,
                        }}
                        iconProps={{
                            className:
                                "mx-auto my-3 h-10 w-10 sm:my-10 sm:h-20 sm:w-20",
                        }}
                    />
                </span>
                <p className="w-full">
                    <span className="ellipsis block w-full">
                        <span className="font-bold text-white">{name}</span>
                    </span>
                    <span className="ellipsis block w-full">
                        <span className="capitalize opacity-60">{type}</span>
                    </span>
                </p>

                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        await togglePlay();
                    }}
                    className={cn(
                        "bottom-[30%] right-[5%] rounded-full bg-spotify p-4 text-black transition-all hover:scale-110 group-hover/vertical-card:pointer-events-auto group-hover/vertical-card:translate-y-0 group-hover/vertical-card:opacity-100",
                        {
                            "!pointer-events-auto !translate-y-0 !opacity-100":
                                isPlayingOrigin,
                            "sm:pointer-events-none sm:absolute sm:translate-y-4 sm:opacity-0":
                                cardVariant === "responsive",
                            "pointer-events-none absolute translate-y-4 opacity-0":
                                cardVariant === "vertical",
                        },
                    )}
                    title={title}
                >
                    <PlayPauseIcon playingStatus={isPlayingOrigin} />
                    <span className="sr-only">{title}</span>
                </button>
            </div>
        </Link>
    );
}

export default VerticalPreviewCard;
