"use client";

import { ElementType, HTMLAttributes } from "react";

import usePalette from "@/hooks/use-palette";
import { cn } from "@/lib/utils";
import { PaletteColors } from "@/types/types";

function PaletteWrapperComponent({
    as: Tag,
    images,
    paletteColor = "darkMuted",
    className,
    gradient = false,
    style,
    ...rest
}: {
    as: ElementType;
    images: string | SpotifyApi.ImageObject[] | undefined;
    paletteColor?: keyof PaletteColors;
    gradient?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>) {
    const { data, loading, error } = usePalette(images);

    const customBackground = gradient
        ? {
              backgroundImage:
                  loading || error
                      ? undefined
                      : `linear-gradient(to bottom, ${data[paletteColor]},black 60%)`,
          }
        : {
              backgroundColor:
                  loading || error ? undefined : data[paletteColor],
          };
    return (
        <Tag
            style={{
                ...customBackground,

                ...style,
            }}
            className={cn(className, {
                "bg-background": loading || error,
                "animate-pulse": loading,
            })}
            {...rest}
        />
    );
}

export default PaletteWrapperComponent;
