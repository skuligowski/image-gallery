import { Album } from "../../types/api";

export function groupAlbumsNoDate(albums: Album[]): Album[] {
    return [...albums]
        .filter(album => !album.date)
        .sort((a1, a2) => a2.createDate.localeCompare(a1.createDate));
}