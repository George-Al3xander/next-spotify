import PlayPauseIcon from "@/components/play-pause-icon";
import SpotifyImage from "@/components/utils/spotify-image";
import { cn } from "@/lib/utils";
import { TrackPlayBtnBaseProps } from "@/types/types";

function TrackCover({
    images,
    title,
    isCurrentlyPlaying,
    togglePlay,
    withIndex,
}: TrackPlayBtnBaseProps & {
    images: SpotifyApi.ImageObject[];

    withIndex: boolean;
}) {
    return (
        <button
            title={!withIndex ? title : undefined}
            disabled={withIndex}
            onClick={togglePlay}
            className="relative max-h-14 max-w-14 overflow-hidden rounded-lg"
        >
            <SpotifyImage
                type={"music"}
                images={images}
                imageProps={{
                    className: cn(
                        "h-full w-full object-cover transition-all ",
                        {
                            "group-focus-within/track-card:opacity-60 group-hover/track-card:opacity-60":
                                !withIndex,
                        },
                    ),
                    width: 100,
                    height: 100,
                    alt: `${title} cover`,
                }}
                iconProps={{
                    size: 20,
                    className: cn("text-spotify", {
                        " group-focus-within/track-card:opacity-40 group-hover/track-card:opacity-40":
                            !withIndex,
                    }),
                }}
            />

            {!withIndex && (
                <span
                    className={
                        "invisible absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center hover:cursor-pointer group-focus-within/track-card:visible group-hover/track-card:visible"
                    }
                >
                    <PlayPauseIcon
                        playingStatus={isCurrentlyPlaying}
                        size={20}
                        className="mx-auto my-0 text-white"
                    />
                </span>
            )}
        </button>
    );
}

export default TrackCover;
