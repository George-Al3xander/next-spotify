import React from "react";

import { useRouter } from "next/router";

import BackForwardButtons from "@/components/back-forward-buttons";
import SearchBar from "@/components/search/search-bar";
import SearchTabButtons from "@/components/search/search-tab-buttons";
import UserDropdownMenu from "@/components/user/user menu/user-dropdown-menu";
import UserMenu from "@/components/user/user menu/user-menu";
import { TSearchTabVariant } from "@/types/types";

function Header() {
    return (
        <header className="sticky top-0 z-20 flex flex-col gap-4 bg-card py-4">
            <div className="flex w-full flex-row-reverse items-center justify-between gap-4 sm:flex-row">
                <div className="flex basis-full items-center gap-4">
                    <BackForwardButtons />
                    <SearchBar />
                </div>
                <UserMenu />
            </div>
            <SearchTabButtons />
        </header>
    );
}

export default Header;
