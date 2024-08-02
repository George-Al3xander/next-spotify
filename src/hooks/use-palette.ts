import { usePalette as usePaletteNpm } from "react-palette";

const usePalette = (images: string | SpotifyApi.ImageObject[] | undefined) => {
    let url = "";
    if (Array.isArray(images)) {
        if (images.length > 0) {
            url = images[0].url;
        }
    }
    return usePaletteNpm(url);
};

export default usePalette;
