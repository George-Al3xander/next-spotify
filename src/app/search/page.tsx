import React, { Suspense } from "react";

import { nanoid } from "nanoid";

import BrowseTab from "@/components/browse-tab";
import ScrollList from "@/components/search/scroll-list";
import SearchItems from "@/components/search/search-items";
import SpotifySuspenseSkeleton from "@/components/skeletons/spotify-suspense-skeleton";
import { parseSearchTab } from "@/lib/utils";
import { searchTabVariants } from "@/constants/data";
import { TSearchTabVariant } from "@/types/types";

function SearchPage({
    searchParams,
}: {
    searchParams: {
        searchQuery?: string;
        searchTab?: TSearchTabVariant;
    };
}) {
    const { searchQuery } = searchParams;
    const searchTab = parseSearchTab(searchParams.searchTab);
    if (!searchQuery) return <BrowseTab />;

    return (
        <main>
            {searchTab !== "all" ? (
                <ScrollList />
            ) : (
                searchTabVariants.slice(1).map((variant) => (
                    <SpotifySuspenseSkeleton
                        key={nanoid()}
                        type={variant as "tracks"}
                    >
                        <SearchItems
                            variant={variant}
                            searchParams={searchParams}
                        />
                    </SpotifySuspenseSkeleton>
                ))
            )}
        </main>
    );
}

export default SearchPage;
