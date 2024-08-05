import InfiniteScrollList from "@/components/infinite-scroll-list";
import { provideTokenServer, searchItemsDynamically } from "@/lib/utils";
import { TSearchTabVariant } from "@/types/types";

function SearchScrollList({
    searchTab,
    searchQuery: query,
}: {
    searchQuery: string;
    searchTab: TSearchTabVariant;
}) {
    const getItems = async (options: { offset: number; limit: number }) => {
        "use server";
        await provideTokenServer();
        const res = await searchItemsDynamically({
            query,
            itemVariant: searchTab,
            options,
        });

        return res.body[`${searchTab as Exclude<TSearchTabVariant, "all">}`]!;
    };

    return (
        <InfiniteScrollList
            getItems={getItems}
            type={searchTab === "all" ? "tracks" : searchTab}
            noResultsMessage={
                <section className="my-10 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                        No results found for &quot;
                        {query}&quot;
                    </h2>
                    <p>
                        Please make sure your words are spelled correctly or use
                        less or different keywords.
                    </p>
                </section>
            }
        />
    );
}

export default SearchScrollList;
