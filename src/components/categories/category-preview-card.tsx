"use client";

import React from "react";
import { usePalette } from "react-palette";

import Link from "next/link";

import SpotifyImage from "@/components/spotify-image";
import { cn } from "@/lib/utils";

function CategoryPreviewCard({ name, id, icons }: SpotifyApi.CategoryObject) {
    let url = "";
    if (icons.length > 0) {
        url = icons[0].url;
    }

    const { data, loading, error } = usePalette(url);

    return (
        <Link href={`/categories/${id}`} key={id}>
            <li
                style={{
                    backgroundColor:
                        loading || error ? undefined : data.darkMuted,
                }}
                className={cn(
                    "relative flex h-[120px] justify-between gap-4 overflow-hidden rounded-lg p-4 text-white sm:min-w-[300px]",
                    {
                        "bg-background": loading || error,
                        "animate-pulse": loading,
                    },
                )}
                key={id}
            >
                <p className="text-lg font-bold"> {name}</p>
                {icons.length > 0 && (
                    <span className="absolute -bottom-2 right-[-20px] h-[90px] w-[90px] rotate-45 overflow-hidden rounded-lg">
                        <SpotifyImage
                            type={"category"}
                            images={icons}
                            imageProps={{
                                className: "h-full w-full object-cover",
                                width: 120,
                                height: 120,
                                alt: `Cover for ${name}`,
                            }}
                            iconProps={{
                                size: 80,
                            }}
                        />
                    </span>
                )}
            </li>
        </Link>
    );
}

export default CategoryPreviewCard;
