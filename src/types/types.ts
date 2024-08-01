export type TSearchTabVariant =
    | "all"
    | "playlists"
    | "artists"
    | "albums"
    | "tracks";

export interface Response<T> {
    body: T;
    headers: Record<string, string>;
    statusCode: number;
}

interface LimitOptions {
    limit?: number | undefined;
}

interface PaginationOptions extends LimitOptions {
    offset?: number | undefined;
}

export interface SearchOptions extends PaginationOptions {
    include_external?: "audio" | undefined;
}

export interface PagingObject<T> {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}
