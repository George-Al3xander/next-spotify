"use client";

import React from "react";

import useSearch from "@/hooks/use-search";
import { Search, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const iconStyles = "h-5 w-5";

function SearchBar() {
    const pathname = usePathname();

    const { clear, isValid, handleChange, searchQuery } = useSearch();
    if (pathname !== "/search") return null;
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="group/search w-full"
            role="search"
        >
            <label
                className={
                    "flex items-center rounded-full border-2 border-transparent bg-background p-4 transition-all group-focus-within/search:border-primary"
                }
                htmlFor="search-bar"
            >
                <Search
                    className={cn(
                        "opacity-60 group-focus-within/search:opacity-100",
                        iconStyles,
                    )}
                />
                <input
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder={"What do you want to play?"}
                    className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-sm autofill:!bg-background"
                    id={"search-query"}
                    type="text"
                />
                <X
                    onClick={clear}
                    className={cn("ml-auto", iconStyles, {
                        invisible: !isValid,
                    })}
                />
            </label>
        </form>
    );
}

export default SearchBar;
