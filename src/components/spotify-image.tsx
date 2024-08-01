import React from "react";
import { IconBaseProps } from "react-icons";
import { GoPersonFill } from "react-icons/go";
import { IoIosMusicalNotes } from "react-icons/io";
import { RiPlayListLine } from "react-icons/ri";

import Image, { ImageProps } from "next/image";

function SpotifyImage({
    type,
    images,
    iconProps,
    imageProps,
}: {
    type: "person" | "music" | "category";
    images: SpotifyApi.ImageObject[] | string | undefined;
    iconProps?: IconBaseProps;
    imageProps: Omit<ImageProps, "src">;
}) {
    let url: string | undefined;
    if (images !== undefined) {
        if (Array.isArray(images)) {
            if (images.length > 0) {
                url = images[0].url;
            }
        }

        if (typeof images === "string") {
            url = images;
        }
    }

    if (!url) {
        if (type === "category") return <RiPlayListLine {...iconProps} />;
        if (type === "person") return <GoPersonFill {...iconProps} />;

        return <IoIosMusicalNotes {...iconProps} />;
    }

    return <Image src={url} {...imageProps} />;
}

export default SpotifyImage;
