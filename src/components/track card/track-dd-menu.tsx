import React from "react";
import toast from "react-hot-toast";
import { MdOutlineQueueMusic } from "react-icons/md";

import { Disc, Ellipsis, ListStart, Share, User } from "lucide-react";
import Link from "next/link";

import spotifyApi from "@/lib/spotify";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ArtistsSubMenu = ({
    artists,
}: {
    artists: SpotifyApi.ArtistObjectSimplified[];
}) => {
    const label = (
        <>
            <User className="mr-2 h-4 w-4" />
            <span>Go to artist</span>
        </>
    );

    if (artists.length === 1) {
        const { name, id } = artists[0];
        return (
            <DropdownMenuItem asChild>
                <Link href={`/artists/${id}`}>{label}</Link>
            </DropdownMenuItem>
        );
    }

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>{label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {artists.map(({ id, name }) => (
                        <DropdownMenuItem asChild key={id + "-submenu"}>
                            <Link href={`/artists/${id}`}>
                                <span>{name}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

function TrackDropDownMenu({
    title,
    artists,
    album,
    externalUrl,
    uri,
}: {
    artists: SpotifyApi.ArtistObjectSimplified[];
    externalUrl: string;
    album: SpotifyApi.AlbumObjectSimplified;
    title: string;
    uri: string;
}) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button
                    title={`More options for ${title}`}
                    className="ml-auto rotate-90 hover:text-white sm:invisible sm:ml-0 sm:rotate-0 group-focus-within/track-card:sm:visible group-hover/track-card:sm:visible"
                >
                    <Ellipsis />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                    onClick={() => {
                        toast.promise(spotifyApi.addToQueue(uri), {
                            loading: "Adding...",
                            success: <b>Added to queue</b>,
                            error: <b>Failed adding to queue</b>,
                        });
                    }}
                >
                    <ListStart className="mr-2 h-4 w-4" />
                    <span>Add to queue</span>
                </DropdownMenuItem>

                <ArtistsSubMenu artists={artists} />
                <DropdownMenuItem asChild>
                    <Link href={`/albums/${album.id}`}>
                        <Disc className="mr-2 h-4 w-4" />
                        <span>Go to album</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        navigator.clipboard
                            .writeText(externalUrl)
                            .then(() =>
                                toast.success("Link copied to clipboard!", {
                                    position: "bottom-center",
                                }),
                            )
                            .catch(() =>
                                toast.error(
                                    "Failed to copy link to clipboard!",
                                    {
                                        position: "bottom-center",
                                    },
                                ),
                            );
                    }}
                >
                    <Share className="mr-2 h-4 w-4" />
                    <span>Share</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default TrackDropDownMenu;
