"use client";

import React, { ReactNode } from "react";
import { FaSpotify } from "react-icons/fa";

import useHandleToken from "@/hooks/use-handle-token";

function TokenHandler({ children }: { children: ReactNode }) {
    const { status } = useHandleToken();
    if (status === "loading")
        return (
            <main className="flex h-full w-full justify-center text-spotify">
                <p className="mt-[30vh] flex items-center gap-4 text-center text-2xl sm:text-4xl">
                    <FaSpotify size={55} className="animate-pulse" />
                    <span className="animate-pulse text-white">
                        Authenticating...
                    </span>
                </p>
            </main>
        );

    return children;
}

export default TokenHandler;
