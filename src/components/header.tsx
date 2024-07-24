import React from 'react';

import { useRouter } from 'next/router';

import BackForwardButtons from '@/components/back-forward-buttons';
import UserDropdownMenu from '@/components/user/user-dropdown-menu';

function Header() {
    return (
        <header className="flex w-full items-center justify-between">
            <BackForwardButtons />
            <UserDropdownMenu />
        </header>
    );
}

export default Header;
