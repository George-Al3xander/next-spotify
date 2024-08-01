import toast from "react-hot-toast";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import spotifyApi from "@/lib/spotify";
import { $currentUri, $isPlaying, $originUri } from "@/state/atoms/atoms";
import { $isCurrentTrack } from "@/state/selectors/selectors";

const usePlay = (uri: string, id: string) => {
    const [isPlaying, setPlaying] = useRecoilState($isPlaying);
    const [originUri, setOriginUri] = useRecoilState($originUri);
    const setCurrentUri = useSetRecoilState($currentUri);
    const isCurrent = useRecoilValue($isCurrentTrack(id));
    const isCurrentlyPlaying = Boolean(isCurrent && isPlaying);
    const isOrigin = Boolean(originUri === uri);
    const isPlayingOrigin = Boolean(isOrigin && isPlaying);
    const playTrack = () => {
        setCurrentUri(uri);
        /*try {
            if (uri.includes("track")) {
                await spotifyApi.play({ uris: [uri] });
            }
        } catch (e) {
            if (e instanceof Error) {
                console.log("name", e.name);
                console.log("cause", e.cause);
            }
            toast.error(e instanceof Error ? e.message : "Failed to play", {
                duration: 3500,
            });
        } finally {
        }*/
        setOriginUri(uri);
        setPlaying(true);
    };
    const togglePlay = async (twoWay: boolean | undefined = true) => {
        if (twoWay) {
            if (isCurrent || isOrigin) {
                setPlaying((val) => !val);
            } else {
                playTrack();
            }
        } else {
            playTrack();
        }
    };
    return { isCurrentlyPlaying, togglePlay, isCurrent, isPlayingOrigin };
};

export default usePlay;
