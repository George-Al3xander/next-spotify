import { useEffect, useState } from "react";

import useAdvancedParams from "@/hooks/use-advanced-params";
import useProvideToken from "@/hooks/use-provide-token";

import { generateSearchOptions } from "@/lib/utils";
import { InfiniteScrollProps } from "@/types/types";

const useInfiniteScroll = <T>({
    getItems,
    initialItems,
    initialParams,
}: InfiniteScrollProps<T>) => {
    useProvideToken();
    const { searchQuery: query, searchTab: currentTab } = useAdvancedParams();
    const [offset, setOffset] = useState(
        initialParams ? initialParams.offset + initialParams.limit : 0,
    );
    const [limit, setLimit] = useState(
        initialParams ? initialParams.limit : 20,
    );
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [items, setItems] = useState<T[]>(initialItems || []);
    const [isLoading, setIsLoading] = useState(false);

    const next = async (manualOptions?: { offset: number; limit: number }) => {
        const options = manualOptions || { offset, limit };

        const newItems = await getItems(options);
        if ("next" in newItems) {
            const newBool = Boolean(newItems.next);

            setHasMore(newBool);
            if (newBool) {
                const newOptions = generateSearchOptions(newItems.next);

                setOffset(newOptions["offset"]);
                setLimit(newOptions["limit"]);
            }
        }

        if (manualOptions) {
            setItems(newItems.items);
        } else {
            setItems((prev) => prev.concat(newItems.items));
        }
    };

    const initialFetch = () => {
        setIsLoading(true);
        next({ offset: 0, limit: 20 }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (!isLoading && !initialItems) {
            initialFetch();
        }
    }, [currentTab, query]);

    return {
        currentTab,
        dataLength: items.length || 20,
        hasMore,
        next,
        items,
        isLoading,
    };
};

export default useInfiniteScroll;
