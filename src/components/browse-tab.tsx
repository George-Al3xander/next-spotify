import React from "react";

import CategoryPreviewCard from "@/components/categories/category-preview-card";
import spotifyApi from "@/lib/spotify";
import { provideTokenServer } from "@/lib/utils";

async function BrowseTab() {
    await provideTokenServer();
    const categoriesRes = await spotifyApi.getCategories();
    const items = categoriesRes.body.categories.items;

    return (
        <main>
            <h2 className="my-4 text-2xl font-bold capitalize text-white">
                Browse All
            </h2>

            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                {items.map((cat) => (
                    <CategoryPreviewCard {...cat} key={cat.id} />
                ))}
            </ul>
        </main>
    );
}

export default BrowseTab;
