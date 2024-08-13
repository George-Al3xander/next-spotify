import PlayPauseIcon from "@/components/play-pause-icon";
import { cn } from "@/lib/utils";
import { TrackPlayBtnBaseProps } from "@/types/types";
import { AiFillSound } from "react-icons/ai";

function TrackIndex({
    index,
    isCurrentlyPlaying,
    isCurrent,
    togglePlay,
    title,
}: TrackPlayBtnBaseProps & {
    index?: number;
    isCurrent: boolean;
}) {
    if (!index) return null;

    return (
        <button title={title} className="relative mx-2" onClick={togglePlay}>
            <span className="absolute inset-0 flex flex-col justify-center">
                <AiFillSound
                    size={20}
                    className={cn(
                        "hidden basis-full text-spotify group-focus-within/track-card:hidden group-hover/track-card:hidden",
                        {
                            "inline animate-pulse": isCurrentlyPlaying,
                        },
                    )}
                />
                <PlayPauseIcon
                    playingStatus={isCurrentlyPlaying}
                    size={15}
                    className="hidden group-focus-within/track-card:inline group-hover/track-card:inline"
                />
            </span>

            <span
                className={cn(
                    "text-lg font-semibold group-focus-within/track-card:invisible group-hover/track-card:invisible",
                    {
                        "text-spotify": isCurrent,
                        invisible: isCurrentlyPlaying,
                    },
                )}
            >
                {index}
            </span>
        </button>
    );
}

export default TrackIndex;
