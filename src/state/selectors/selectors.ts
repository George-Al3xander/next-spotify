import { selectorFamily } from "recoil";

import { $currentId } from "@/state/atoms/atoms";

export const $isCurrentTrack = selectorFamily({
    key: "is_current_track_sf",
    get:
        (id) =>
        ({ get }) => {
            const currentId = get($currentId);

            return currentId === id;
        },
});
