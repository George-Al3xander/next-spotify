import { IconBaseProps } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";

function PlayPauseIcon({
    playingStatus,
    ...props
}: IconBaseProps & { playingStatus: boolean }) {
    const Icon = playingStatus ? FaPause : FaPlay;

    return <Icon {...props} />;
}

export default PlayPauseIcon;
