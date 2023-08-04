import { Album } from "../../../types/api";

export interface AlbumsInYear {
    year: string;
    months: AlbumsInMonth[];
}

export interface AlbumsInMonth {
    month: string;
    monthIndex: number;
    albums: Album[];
}

export function groupAlbumsByYear(albums: Album[], monthNames: string[]): AlbumsInYear[] {
    const sortedAlbums = [...albums].sort((a1, a2) => `${a1.date} ${a1.name}`.localeCompare(`${a2.date} ${a2.name}`));
    const byYearMap = sortedAlbums.reduce(( map, album ) => {
        if (album.date) {
            const [albumYear, albumMonth] = album.date.split('-');
            const year = map[albumYear] ||= [];
            const month = year[parseInt(albumMonth)] ||= [];
            month.push(album);
        } 
        return map;
    }, {} as {[key: string]: Album[][]});

    return Object.keys(byYearMap)
        .sort((y1, y2) => y2.localeCompare(y1))
        .map(year => ({
             year, 
             months: byYearMap[year]
                .map((month, i) => ({ month: monthNames[i - 1], monthIndex: i, albums: month }))
                .filter(month => month)
                .sort((a1, a2) => a2.monthIndex - a1.monthIndex)
        }))
}