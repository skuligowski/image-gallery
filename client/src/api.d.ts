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
        permalink?: string;
        tree: string[];
        /**
         * entry photo for the album
         */
        thumbUrl?: string;
        /**
         * size of the album
         */
        size: number;
    }
    export type AlbumsResponse = Album[];
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
}
