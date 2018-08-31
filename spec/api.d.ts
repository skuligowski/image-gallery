declare namespace Definitions {
    export interface Album {
        /**
         * unique identifier of the album
         */
        id: string;
        /**
         * albums
         */
        name: string;
        /**
         * unique link for album
         */
        permalink: string;
        /**
         * menu tree for the album
         */
        tree: string[];
        /**
         * entry photo for the album
         */
        thumbUrl?: string;
        /**
         * size of the album
         */
        size: number;
        /**
         * last modified date time
         */
        lastModified: string; // date-time
    }
    export interface AlbumCreate {
        /**
         * album name
         */
        name: string;
        /**
         * album permalink
         */
        permalink: string;
        tree: string[];
    }
    export type AlbumsResponse = Album[];
    export type FilesResponse = {
        name: string;
        dir: boolean;
        size: number;
    }[];
    export interface Image {
        /**
         * image filename
         */
        filename: string;
        /**
         * link to reach the image
         */
        url: string;
        /**
         * title describing the image
         */
        title?: string;
        /**
         * width of the image
         */
        width: number;
        /**
         * height of the image
         */
        height: number;
    }
    export type ImagesResponse = Image[];
    export interface Login {
        /**
         * Username
         */
        username: string;
        /**
         * Password
         */
        password: string;
    }
    export interface User {
        /**
         * Username
         */
        username: string;
        /**
         * Set to true if the user has administration privileges
         */
        admin: boolean;
    }
}
