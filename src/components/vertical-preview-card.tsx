"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";

import usePlay from "@/hooks/use-play";
import { Pause, Play } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

import PersonDefaultAvatar from "../../public/assets/img/person_default_avatar.svg";
import PlaylistDefaultCover from "../../public/assets/img/playlist_default_cover.png";

import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

function VerticalPreviewCard({
    id,
    uri,
    type,
    name,
    images,
    cardVariant = "responsive",
    ...props
}: (
    | ArtistObjectFull
    | PlaylistObjectFull
    | AlbumObjectFull
    | PlaylistObjectSimplified
) & { cardVariant?: "responsive" | "vertical" | "horizontal" }) {
    let url: string | StaticImageData =
        type === "artist" ? PersonDefaultAvatar : PlaylistDefaultCover;

    if (images) {
        if (images.length > 0) {
            url = images[0].url;
        }
    }
    if ("image" in props) {
        if (typeof props.image === "string") {
            url = props.image;
        }
    }

    let authors: string | undefined = undefined;
    const { togglePlay, isPlayingOrigin } = usePlay(uri, id);
    const Icon = isPlayingOrigin ? FaPause : FaPlay;
    let title = `${isPlayingOrigin ? "Stop playing" : "Play"} ${name}`;

    if (type === "album" && "artists" in props) {
        authors = props.artists.map(({ name }) => name).join(", ");
    }
    if (type === "playlist" && "owner" in props) {
        authors = props.owner.display_name;
    }

    if (authors) {
        title = `${title} by ${authors}`;
    }

    return (
        <div
            onDoubleClick={() => togglePlay(false)}
            title={name}
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
                    "aspect-square min-h-[4rem] min-w-[4rem] overflow-hidden rounded-lg bg-background sm:mx-auto sm:h-[11rem] sm:w-[11rem]",
                    {
                        "rounded-full": type === "artist",
                    },
                )}
            >
                <Image
                    className="h-full w-full object-cover"
                    width={200}
                    height={200}
                    src={url}
                    alt={`${name}'s cover`}
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
                onClick={() => togglePlay()}
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
                <Icon />
                <span className="sr-only">{title}</span>
            </button>
        </div>
    );
}

export default VerticalPreviewCard;
