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
 * AlbumResponse
 */
export interface AlbumResponse {
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
  images: /* Image */ Image[];
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
export type AlbumsResponse = /* Album */ Album[];
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
