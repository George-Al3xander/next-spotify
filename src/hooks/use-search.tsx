import { ChangeEvent, useEffect, useState } from "react";

import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const slug = (str: string) => str.replace(/\s/g, "-").toLowerCase();

const useSearch = () => {
    const router = useRouter();
    const currSearchParams = useSearchParams();
    const currSearchQuery = (
        currSearchParams.get("searchQuery") || ""
    ).replaceAll("-", " ");
    const [searchQuery, setSearchQuery] = useState<string>(currSearchQuery);
    const [isValid, setIsValid] = useState(false);
    const [debounceVal] = useDebounce(searchQuery, 500);
    const search = () => {
        const newSearchParams = new URLSearchParams(currSearchParams);
        if (isValid) {
            newSearchParams.set("searchQuery", slug(searchQuery.trim()));
        }

        router.push(`?${newSearchParams.toString()}`);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const clear = () => {
        const newSearchParams = new URLSearchParams(currSearchParams);
        newSearchParams.delete("searchQuery");
        setSearchQuery("");
        router.push(`?${newSearchParams.toString()}`);
    };

    useEffect(() => {
        if (searchQuery.length < 1) {
            clear();
        }
        if (searchQuery && /\S/.test(searchQuery) && searchQuery.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        setSearchQuery(currSearchQuery);
    }, [currSearchQuery]);

    useEffect(() => {
        search();
    }, [debounceVal]);

    return { searchQuery, isValid, handleChange, clear };
};

export default useSearch;
