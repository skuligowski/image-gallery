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
         * date when images were taken
         */
        date?: string; // date
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
        /**
         * date of creation
         */
        createDate: string; // date-time
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
        date?: string; // date
    }
    export type AlbumsResponse = Album[];
    /**
     * tbd
     */
    export interface BatchProcessingRequest {
        resize?: {
            width: number;
            height: number;
            mode: string;
        };
        urls?: string[];
    }
    export interface Config {
        /**
         * Main page title, the name for the gallery
         */
        galleryName: string;
        /**
         * Maximum number of tiles return for dashboard
         */
        dashboardTilesCount: number;
        /**
         * Image presented on dashboard. If not set, the first image of last modified album is presented
         */
        dashboardImageUrl?: string;
        /**
         * Defines if the user can download an image.
         */
        imageDownload: boolean;
    }
    export interface DirectoryCreateRequest {
        /**
         * directory name
         */
        name: string;
    }
    export type FilesResponse = LibraryFile[];
    export interface Image {
        /**
         * image filename
         */
        filename: string;
        /**
         * image url, relative to library context
         */
        url: string;
        /**
         * url for thumbnail of the image
         */
        thumbUrl?: string;
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
    /**
     * list of library paths of new images for the album
     */
    export type ImagesAddRequest = string[];
    /**
     * list of filenames with proper order, all images should be listed that belong to the album
     */
    export type ImagesOrderRequest = string[];
    /**
     * list of image filenames to remove
     */
    export type ImagesRemovalRequest = string[];
    export type ImagesResponse = Image[];
    export interface LibraryDirValidationRequest {
        libraryDir: string;
    }
    export interface LibraryFile {
        filename: string;
        path?: string;
        dir: boolean;
        size?: number;
    }
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
    export interface Settings {
        /**
         * Main page title, the name for the gallery
         */
        galleryName?: string;
        /**
         * Defines if all user should authenticate before etner to gallery
         */
        authentication?: boolean;
        /**
         * Language of gallery
         */
        language?: string;
        /**
         * Library directory
         */
        libraryDir?: string;
        /**
         * Maximum number of tiles return for dashboard
         */
        dashboardTilesCount?: number;
        /**
         * Welcome img presented on dashboard screen. If not set, the first image of last modified album is taken
         */
        dashboardImageUrl?: string;
        /**
         * Width of generated thumbnail, in pixels
         */
        thumbnailWidth?: number;
        /**
         * Quality of generated thumbnails, in percent
         */
        thumbnailQuality?: number;
        /**
         * Defines if the user can download an image
         */
        imageDownload?: boolean;
    }
    /**
     * list of image urls for which thumbs should be create/regenerted
     */
    export type ThumbnailsCreateRequest = string[];
    export interface User {
        /**
         * Username
         */
        username: string;
        /**
         * Set to true if the user has administration privileges
         */
        admin: boolean;
        /**
         * Set to true if authentication is switched off and any user can access the gallery
         */
        guest?: boolean;
    }
    export interface UserCreateRequest {
        /**
         * album name
         */
        username: string;
        /**
         * album permalink
         */
        password: string;
        admin: boolean;
    }
    export interface UserPasswordChangeRequest {
        /**
         * album name
         */
        username: string;
        /**
         * album permalink
         */
        password: string;
    }
    export type UsersResponse = User[];
    export interface Validation {
        /**
         * Validation result
         */
        valid: boolean;
    }
}
