declare namespace Definitions {
    export interface Album {
        /**
         * albums
         */
        name: string;
        /**
         * unique link for album
         */
        permalink?: string;
    }
    export interface AlbumDetails {
        /**
         * albums
         */
        name: string;
        /**
         * unique link for album
         */
        permalink: string;
        photos: Photo[];
    }
    export interface AlbumsResponse {
        /**
         * albums
         */
        albums: Album[];
    }
    export interface Photo {
        /**
         * photo
         */
        filename: string;
        /**
         * link to reach the photo
         */
        url: string;
        /**
         * title describing the photo
         */
        title?: string;
    }
}
