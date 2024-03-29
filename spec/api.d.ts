declare namespace Definitions {
    /**
     * Albums
     */
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
        /**
         * if album is visible in gallery
         */
        active: boolean;
    }
    /**
     * AlbumCreate
     */
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
    /**
     * AlbumCreateResponse
     */
    export interface AlbumCreateResponse {
        /**
         * album identifier
         */
        id: string;
    }
    /**
     * AlbumUpdateRequest
     */
    export interface AlbumUpdateRequest {
        /**
         * album name
         */
        name?: string;
        /**
         * album permalink
         */
        permalink?: string;
        date?: string | null; // date
        active?: boolean;
    }
    /**
     * AlbumsResponse
     */
    export type AlbumsResponse = /* Albums */ Album[];
    /**
     * Config
     */
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
    /**
     * DirectoryCreateRequest
     */
    export interface DirectoryCreateRequest {
        /**
         * directory name
         */
        name: string;
    }
    /**
     * LibraryFilesResponse
     */
    export type FilesResponse = /* LibraryFile */ LibraryFile[];
    /**
     * Image
     */
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
        /**
         * size of the image (optional)
         */
        size?: number;
        processing?: /**
         * Processing
         * Processing
         */
        Processing;
    }
    /**
     * ImagesAddRequest
     * list of library paths of new images for the album
     */
    export type ImagesAddRequest = string[];
    /**
     * ImagesOrderRequest
     * list of filenames with proper order, all images should be listed that belong to the album
     */
    export type ImagesOrderRequest = string[];
    /**
     * ImagesRemovalRequest
     * list of image filenames to remove
     */
    export type ImagesRemovalRequest = string[];
    /**
     * ImagesResponse
     */
    export type ImagesResponse = /* Image */ Image[];
    /**
     * LibraryDirValidationRequest
     */
    export interface LibraryDirValidationRequest {
        libraryDir: string;
    }
    /**
     * LibraryFile
     */
    export interface LibraryFile {
        filename: string;
        path?: string;
        dir: boolean;
        size?: number;
    }
    /**
     * Login
     */
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
    /**
     * Processing
     * Processing
     */
    export interface Processing {
        source: /**
         * ProcessingImage
         * Processing image metadata
         */
        ProcessingImage;
        output: /**
         * ProcessingImage
         * Processing image metadata
         */
        ProcessingImage;
        params: /**
         * ProcessingParams
         * Processing params
         */
        ProcessingParams;
    }
    /**
     * ProcessingAdjustParams
     */
    export interface ProcessingAdjustParams {
        exposure: number;
        contrast: number;
    }
    /**
     * ProcessingExportParams
     */
    export interface ProcessingExportParams {
        quality: number;
    }
    /**
     * ProcessingImage
     * Processing image metadata
     */
    export interface ProcessingImage {
        url: string;
        width: number;
        height: number;
        size?: number;
    }
    /**
     * ProcessingParams
     * Processing params
     */
    export interface ProcessingParams {
        resize?: /* ProcessingResizeParams */ ProcessingResizeParams;
        sharpen?: /* ProcessingSharpenParams */ ProcessingSharpenParams;
        adjust: /* ProcessingAdjustParams */ ProcessingAdjustParams;
        export: /* ProcessingExportParams */ ProcessingExportParams;
    }
    /**
     * ProcessingRequest
     * Processing params
     */
    export interface ProcessingRequest {
        resize?: /* ProcessingResizeParams */ ProcessingResizeParams;
        sharpen?: /* ProcessingSharpenParams */ ProcessingSharpenParams;
        adjust: /* ProcessingAdjustParams */ ProcessingAdjustParams;
        export: /* ProcessingExportParams */ ProcessingExportParams;
        url: string;
    }
    /**
     * ProcessingResizeParams
     */
    export interface ProcessingResizeParams {
        width: number;
        height: number;
        mode: string;
    }
    /**
     * ProcessingRevertRequest
     * tbd
     */
    export interface ProcessingRevertRequest {
        urls: string[];
    }
    /**
     * ProcessingSharpenParams
     */
    export interface ProcessingSharpenParams {
        amount: number;
    }
    /**
     * Settings
     */
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
     * ThumbnailsCreateRequest
     * object holding url to generate thumbnail for
     */
    export interface ThumbnailsCreateRequest {
        url?: string;
    }
    /**
     * User
     */
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
    /**
     * UserCreateRequest
     */
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
    /**
     * UserPasswordChangeRequest
     */
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
    /**
     * UsersResponse
     */
    export type UsersResponse = /* User */ User[];
    /**
     * Validation
     */
    export interface Validation {
        /**
         * Validation result
         */
        valid: boolean;
    }
}
declare namespace Paths {
    namespace AddImages {
        export interface BodyParameters {
            ImagesAddRequest?: Parameters.ImagesAddRequest;
        }
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
            export type ImagesAddRequest = /**
             * ImagesAddRequest
             * list of library paths of new images for the album
             */
            Definitions.ImagesAddRequest;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* ImagesResponse */ Definitions.ImagesResponse;
        }
    }
    namespace ChangePassword {
        export interface BodyParameters {
            UserPasswordChangeRequest?: Parameters.UserPasswordChangeRequest;
        }
        namespace Parameters {
            export type UserPasswordChangeRequest = /* UserPasswordChangeRequest */ Definitions.UserPasswordChangeRequest;
        }
        namespace Responses {
            export type $401 = string;
        }
    }
    namespace CreateAlbum {
        export interface BodyParameters {
            AlbumCreateRequest?: Parameters.AlbumCreateRequest;
        }
        namespace Parameters {
            export type AlbumCreateRequest = /* AlbumCreate */ Definitions.AlbumCreate;
        }
        namespace Responses {
            export type $200 = /* AlbumCreateResponse */ Definitions.AlbumCreateResponse;
        }
    }
    namespace CreateDirectory {
        export interface BodyParameters {
            AlbumCreateRequest?: Parameters.AlbumCreateRequest;
        }
        namespace Parameters {
            export type AlbumCreateRequest = /* DirectoryCreateRequest */ Definitions.DirectoryCreateRequest;
            export type Parent = string;
        }
        export interface QueryParameters {
            parent?: Parameters.Parent;
        }
        namespace Responses {
            export type $401 = string;
        }
    }
    namespace CreateThumbnail {
        export interface BodyParameters {
            ThumbnailsCreateRequest?: Parameters.ThumbnailsCreateRequest;
        }
        namespace Parameters {
            export type ThumbnailsCreateRequest = /**
             * ThumbnailsCreateRequest
             * object holding url to generate thumbnail for
             */
            Definitions.ThumbnailsCreateRequest;
        }
    }
    namespace CreateUser {
        export interface BodyParameters {
            UserAddRequest?: Parameters.UserAddRequest;
        }
        namespace Parameters {
            export type UserAddRequest = /* UserCreateRequest */ Definitions.UserCreateRequest;
        }
        namespace Responses {
            export type $401 = string;
        }
    }
    namespace DownloadImage {
        namespace Parameters {
            /**
             * File name to download
             */
            export type Filename = string;
            /**
             * Id of the album
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
            filename: /* File name to download */ Parameters.Filename;
        }
    }
    namespace GetAlbums {
        namespace Responses {
            export type $200 = /* AlbumsResponse */ Definitions.AlbumsResponse;
            export type $401 = string;
        }
    }
    namespace GetConfig {
        namespace Responses {
            export type $200 = /* Config */ Definitions.Config;
        }
    }
    namespace GetFiles {
        namespace Parameters {
            export type Parent = string;
        }
        export interface QueryParameters {
            parent?: Parameters.Parent;
        }
        namespace Responses {
            export type $200 = /* LibraryFilesResponse */ Definitions.FilesResponse;
            export type $401 = string;
        }
    }
    namespace GetImages {
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* ImagesResponse */ Definitions.ImagesResponse;
        }
    }
    namespace GetSettings {
        namespace Responses {
            export type $200 = /* Settings */ Definitions.Settings;
            export type $401 = string;
        }
    }
    namespace GetUser {
        namespace Responses {
            export type $200 = /* User */ Definitions.User;
            export type $401 = string;
        }
    }
    namespace GetUsers {
        namespace Responses {
            export type $200 = /* UsersResponse */ Definitions.UsersResponse;
            export type $401 = string;
        }
    }
    namespace Login {
        export interface BodyParameters {
            LoginRequest?: Parameters.LoginRequest;
        }
        namespace Parameters {
            export type LoginRequest = /* Login */ Definitions.Login;
        }
        namespace Responses {
            export type $200 = /* User */ Definitions.User;
            export type $401 = string;
        }
    }
    namespace ModifySettings {
        export interface BodyParameters {
            Settings?: Parameters.Settings;
        }
        namespace Parameters {
            export type Settings = /* Settings */ Definitions.Settings;
        }
        namespace Responses {
            export type $401 = string;
        }
    }
    namespace ProcessImage {
        export interface BodyParameters {
            ProcessingRequest?: Parameters.ProcessingRequest;
        }
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
            export type ProcessingRequest = /**
             * ProcessingRequest
             * Processing params
             */
            Definitions.ProcessingRequest;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* Image */ Definitions.Image;
        }
    }
    namespace RemoveAlbum {
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
    }
    namespace RemoveImages {
        export interface BodyParameters {
            ImagesRemovalRequest?: Parameters.ImagesRemovalRequest;
        }
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
            export type ImagesRemovalRequest = /**
             * ImagesRemovalRequest
             * list of image filenames to remove
             */
            Definitions.ImagesRemovalRequest;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
    }
    namespace RemoveUser {
        namespace Parameters {
            export type Username = string;
        }
        export interface QueryParameters {
            username?: Parameters.Username;
        }
        namespace Responses {
            export type $401 = string;
        }
    }
    namespace RevertProcessedImages {
        export interface BodyParameters {
            ProcessingRevertRequest?: Parameters.ProcessingRevertRequest;
        }
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
            export type ProcessingRevertRequest = /**
             * ProcessingRevertRequest
             * tbd
             */
            Definitions.ProcessingRevertRequest;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* ImagesResponse */ Definitions.ImagesResponse;
        }
    }
    namespace SetImagesOrder {
        export interface BodyParameters {
            ImagesOrderRequest?: Parameters.ImagesOrderRequest;
        }
        namespace Parameters {
            /**
             * Id of the album
             */
            export type Id = string;
            export type ImagesOrderRequest = /**
             * ImagesOrderRequest
             * list of filenames with proper order, all images should be listed that belong to the album
             */
            Definitions.ImagesOrderRequest;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
    }
    namespace UpdateAlbum {
        export interface BodyParameters {
            AlbumUpdateRequest?: Parameters.AlbumUpdateRequest;
        }
        namespace Parameters {
            export type AlbumUpdateRequest = /* AlbumUpdateRequest */ Definitions.AlbumUpdateRequest;
            /**
             * Id of the album
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* Id of the album */ Parameters.Id;
        }
    }
    namespace UploadFile {
        export interface FormDataParameters {
            file: Parameters.File;
        }
        namespace Parameters {
            export type File = unknown;
            export type Parent = string;
        }
        export interface QueryParameters {
            parent?: Parameters.Parent;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $401 = string;
        }
    }
    namespace ValidateLibraryDir {
        export interface BodyParameters {
            LibraryDirValidationRequest?: Parameters.LibraryDirValidationRequest;
        }
        namespace Parameters {
            export type LibraryDirValidationRequest = /* LibraryDirValidationRequest */ Definitions.LibraryDirValidationRequest;
        }
        namespace Responses {
            export type $200 = /* Validation */ Definitions.Validation;
            export type $401 = string;
        }
    }
}
