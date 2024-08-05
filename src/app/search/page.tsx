import { nanoid } from "nanoid";

import BrowseTab from "@/components/browse-tab";
import SearchItems from "@/components/search/search-items";
import SearchScrollList from "@/components/search/search-scroll-list";
import SpotifySuspenseSkeleton from "@/components/utils/spotify-lazy-loader";
import { searchTabVariants } from "@/constants/data";
import { parseSearchTab } from "@/lib/utils";
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
    //TODO: make a way to render SearchItems component dynamically based on the observer
    return (
        <main>
            {searchTab !== "all" ? (
                <SearchScrollList
                    searchTab={searchTab}
                    searchQuery={searchQuery}
                />
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
