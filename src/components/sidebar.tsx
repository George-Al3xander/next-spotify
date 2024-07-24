import React from 'react';

import Nav from '@/components/nav';
import { Card, CardContent } from '@/components/ui/card';

function Sidebar() {
    return (
        <aside className="fixed bottom-4 left-4 top-4 w-[30vw]">
            <Card>
                <CardContent>
                    <Nav />
                </CardContent>
            </Card>
        </aside>
    );
}

export default Sidebar;
