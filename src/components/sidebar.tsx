import React from "react";

import Nav from "@/components/nav";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function Sidebar() {
    return (
        <aside className="bottom-[calc(1rem+80px)] left-4 top-4 hidden max-h-full flex-col gap-4 sm:fixed sm:flex sm:w-[30vw]">
            <Card>
                <CardContent>
                    <Nav />
                </CardContent>
            </Card>
            <ScrollArea className="h-full rounded-lg border bg-card">
                <Card className="border-none">
                    <CardContent>Library</CardContent>
                </Card>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </aside>
    );
}

export default Sidebar;
