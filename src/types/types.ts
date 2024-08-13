export type TSearchTabVariant =
    | "all"
    | "playlists"
    | "artists"
    | "albums"
    | "tracks";

export type Response<T> = {
    body: T;
    headers: Record<string, string>;
    statusCode: number;
};

export type PagingObject<T> = {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
};

export type PaletteColors = {
    vibrant?: string;
    muted?: string;
    darkVibrant?: string;
    darkMuted?: string;
    lightVibrant?: string;
    lightMuted?: string;
};

export type TrackPlayBtnBaseProps = {
    title: string;
    isCurrentlyPlaying: boolean;
    togglePlay: () => void;
};

export type PaginationParams = {
    offset: number;
    limit: number;
};

export type GetPaginationItemsFn<T> = ({
    offset,
    limit,
}: PaginationParams) => Promise<PagingObject<T>>;

export type InfiniteScrollProps<T> = {
    getItems: GetPaginationItemsFn<T>;
    initialItems?: T[];
    initialParams?: PaginationParams;
};
