"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";

import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { nanoid } from "nanoid";

import SpotifyElementSkeleton from "@/components/skeletons/spotify-element-skeleton";
import { cn } from "@/lib/utils";
import { TSearchTabVariant } from "@/types/types";

const SpotifyLazyLoader = ({
    children,
    type,
    count = 5,
    withSuspense = true,
    withTitle = true,
    customTitle,
    variant = "responsive",
}: {
    children?: ReactNode;
    type: Exclude<TSearchTabVariant, "all">;
    withSuspense?: boolean;
    withTitle?: boolean;
    customTitle?: string;
    count?: number;
    variant?: "responsive" | "vertical" | "horizontal";
}) => {
    const items: ReactNode[] = [];
    const [isInView, ref] = useIntersectionObserver(0.5);

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isInView && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [isInView, hasLoaded]);

    for (let i = 0; i < count; i++) {
        items.push(
            <SpotifyElementSkeleton
                key={nanoid()}
                variant={variant}
                type={type}
            />,
        );
    }

    const section = (
        <section className="h-screen" ref={ref} key={nanoid()}>
            {withTitle && (
                <h3 className="my-4 text-2xl font-bold capitalize text-white">
                    {customTitle || type}
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

    if (!withSuspense) return section;
    return (
        <>
            {hasLoaded ? (
                <Suspense key={nanoid()} fallback={section}>
                    {children}
                </Suspense>
            ) : (
                section
            )}
        </>
    );
};

export default SpotifyLazyLoader;
