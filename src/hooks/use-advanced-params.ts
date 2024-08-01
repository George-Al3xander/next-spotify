import { useSearchParams } from "next/navigation";

import { parseSearchTab } from "@/lib/utils";

const useAdvancedParams = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("searchQuery") || "";
    const searchTab = parseSearchTab(searchParams, "tracks");

    return { searchQuery, searchTab };
};

export default useAdvancedParams;
