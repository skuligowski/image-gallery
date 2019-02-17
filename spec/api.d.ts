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
    /**
     * list of paths of new images for the album
     */
    export type ImagesAddRequest = string[];
    /**
     * list of image urls to remove
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
         * Defines if all user should authenticate before etner to gallery
         */
        authentication: boolean;
        /**
         * Library directory
         */
        libraryDir: string;
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
