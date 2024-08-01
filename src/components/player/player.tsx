"use client";

import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
    $accessToken,
    $currentId,
    $currentUri,
    $isPlaying,
} from "@/state/atoms/atoms";

function Player() {
    const token = useRecoilValue($accessToken);
    const [isPlaying, setIsPlaying] = useRecoilState($isPlaying);
    const defaultUri = useRecoilValue($currentUri);
    const setCurrentId = useSetRecoilState($currentId);

    if (!defaultUri) return null;

    return (
        <section className="fixed bottom-0 left-0 z-20 w-full">
            <SpotifyPlayer
                callback={(state) => {
                    if (state.track.uri) {
                        localStorage.setItem("current_uri", state.track.uri);
                    }

                    if (state.track.id) {
                        setCurrentId(state.track.id);
                    }

                    setIsPlaying(state.isPlaying);
                }}
                play={isPlaying}
                hideAttribution
                styles={{
                    activeColor: "var(--clr-primary)",
                    trackNameColor: "white",
                    trackArtistColor: "grey",
                    color: "white",
                    sliderColor: "white",
                    bgColor: "black",
                    sliderHandleColor: "white",
                }}
                token={token || ""}
                uris={[defaultUri]}
            />
        </section>
    );
}

export default Player;
