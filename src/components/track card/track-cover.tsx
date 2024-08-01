import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";

import Image from "next/image";

import SpotifyImage from "@/components/spotify-image";

function TrackCover({
    images,
    title,
    isPlaying,
    playTrack,
}: {
    images: SpotifyApi.ImageObject[];
    title: string;
    isPlaying: boolean;
    playTrack: () => void;
}) {
    const Icon = isPlaying ? FaPause : FaPlay;

    const withPlayStatus = `${isPlaying ? "Stop playing" : "Play"} ${title}`;

    return (
        <button
            title={withPlayStatus}
            onClick={playTrack}
            className="relative max-h-14 max-w-14 overflow-hidden rounded-lg"
        >
            <SpotifyImage
                type={"music"}
                images={images}
                imageProps={{
                    className:
                        "h-full w-full object-cover transition-all group-focus-within/track-card:opacity-60 group-hover/track-card:opacity-60",
                    width: 100,
                    height: 100,
                    alt: `${title} cover`,
                }}
                iconProps={{
                    size: 20,
                    className:
                        "text-spotify group-focus-within/track-card:opacity-40 group-hover/track-card:opacity-40",
                }}
            />

            <span
                className={
                    "invisible absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center hover:cursor-pointer group-focus-within/track-card:visible group-hover/track-card:visible"
                }
            >
                <Icon size={20} className="mx-auto my-0 text-white" />
            </span>
        </button>
    );
}

export default TrackCover;
