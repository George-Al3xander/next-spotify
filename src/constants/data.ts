import { IconType } from "react-icons";
import { FaDownload, FaQuestionCircle, FaUser } from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";

import { TSearchTabVariant } from "@/types/types";

export const searchTabVariants: TSearchTabVariant[] = [
    "all",
    "tracks",
    "artists",
    "albums",
    "playlists",
];

export const navLinks: {
    title: string;
    href: string;
    Icon: IconType;
    IconActive: IconType;
}[] = [
    { title: "Home", href: "/", Icon: GoHome, IconActive: GoHomeFill },
    {
        title: "Search",
        href: "/search",
        Icon: RiSearchLine,
        IconActive: RiSearchFill,
    },
];

export const menuOptions: Record<
    string,
    { href?: string; isExternal?: boolean; Icon: IconType }
> = {
    account: {
        isExternal: true,
        Icon: FaUser,
    },
    support: {
        href: "https://support.spotify.com/ua-en/",
        isExternal: true,
        Icon: FaQuestionCircle,
    },
    download: {
        href: "https://www.spotify.com/de-en/download/other/",
        isExternal: true,
        Icon: FaDownload,
    },
};
