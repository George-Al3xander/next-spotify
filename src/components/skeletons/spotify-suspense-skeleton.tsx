import React, { ReactNode, Suspense } from "react";

import { nanoid } from "nanoid";

import SpotifyElementSkeleton from "@/components/skeletons/spotify-element-skeleton";
import { cn } from "@/lib/utils";
import { TSearchTabVariant } from "@/types/types";

function SpotifySuspenseSkeleton({
    children,
    type,
    count = 5,
    withSuspense = true,
    withTitle = true,
    variant = "responsive",
}: {
    children?: ReactNode;
    type: Exclude<TSearchTabVariant, "all">;
    withSuspense?: boolean;
    withTitle?: boolean;
    count?: number;
    variant?: "responsive" | "vertical" | "horizontal";
}) {
    const items: ReactNode[] = [];

    for (let i = 0; i < count; i++) {
        items.push(
            <SpotifyElementSkeleton
                key={nanoid()}
                variant={variant}
                type={type}
            />,
        );
    }
    if (!withSuspense)
        return (
            <section key={nanoid()}>
                {withTitle && (
                    <h3 className="my-4 text-2xl font-bold capitalize text-white">
                        {type}
                    </h3>
                )}
                <ul
                    className={cn("flex flex-col flex-wrap gap-4", {
                        "sm:flex-row": variant === "responsive",
                        "flex-row": variant === "vertical",
                    })}
                >
                    {items.map((item) => item)}
                </ul>
            </section>
        );

    return (
        <Suspense
            key={nanoid()}
            fallback={
                <section>
                    {withTitle && (
                        <h3 className="my-4 text-2xl font-bold capitalize text-white">
                            {type}
                        </h3>
                    )}
                    <ul className="flex flex-row flex-wrap gap-4">
                        {items.map((item) => item)}
                    </ul>
                </section>
            }
        >
            {children}
        </Suspense>
    );
}

export default SpotifySuspenseSkeleton;
