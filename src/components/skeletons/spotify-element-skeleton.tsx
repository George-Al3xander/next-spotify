import React from "react";

import { cn } from "@/lib/utils";
import { TSearchTabVariant } from "@/types/types";

const skeletonBaseStyles = "w-full animate-pulse rounded-xl bg-secondary";

function SpotifyElementSkeleton({
    type,
    Tag = "li",
    variant = "responsive",
}: {
    type: Exclude<TSearchTabVariant, "all">;
    Tag?: keyof HTMLElementTagNameMap;
    variant?: "responsive" | "vertical" | "horizontal";
}) {
    if (type === "tracks") {
        return <Tag className={cn(skeletonBaseStyles, "h-[3rem]")} />;
    } else {
        return (
            <Tag
                className={cn("flex items-center gap-2", {
                    "sm:flex-col sm:items-start": variant === "responsive",
                    "flex-col items-start": variant === "vertical",
                })}
            >
                <span
                    className={cn(
                        skeletonBaseStyles,
                        "h-[4rem] w-[4rem] rounded-lg sm:h-[11rem] sm:w-[11rem]",
                        {
                            "rounded-full": type === "artists",
                        },
                    )}
                />
                <ul className="flex flex-col gap-2">
                    <li
                        className={cn(skeletonBaseStyles, "h-[16px] w-[12ch]")}
                    />

                    <li
                        className={cn(skeletonBaseStyles, "h-[14px] w-[7ch]")}
                    />
                </ul>
            </Tag>
        );
    }
}

export default SpotifyElementSkeleton;
