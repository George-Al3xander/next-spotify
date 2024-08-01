import { useSearchParams } from "next/navigation";

import { TSearchTabVariant } from "@/types/types";

const useSearchTab = (type: TSearchTabVariant) => {
    const currSearchParams = useSearchParams();
    const currentTab: TSearchTabVariant =
        (currSearchParams.get("searchTab") as TSearchTabVariant) || "all";

    const isCurrent = Boolean(type.toLowerCase() === currentTab.toLowerCase());
};
