import React, { useEffect, useMemo } from 'react';
import { fetchAlbums, selectAlbums } from '../../state/albums/albumsSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useNavigate } from 'react-router-dom';
import style from './AlbumsDirectory.module.scss';
import { AlbumsInMonth, AlbumsInYear, groupAlbumsByYear } from './groupAlbumsByYear';
import { groupAlbumsNoDate } from './groupAlbumsNoDate';

const AlbumsDirectory: React.FC = () => {    
    const dispatch = useAppDispatch();
    const { albums, loading } = useAppSelector(selectAlbums);
    useEffect(() => {
        dispatch(fetchAlbums());
    }, []);
    const [groupedByYear, withoutDate] = useMemo(() => 
        [groupAlbumsByYear(albums || []), groupAlbumsNoDate(albums || [])], [albums]);

    return <div className={style.container}>
        {loading ? null : 
            groupedByYear.map(albumsInYear => <AlbumsInYearView data={albumsInYear} key={albumsInYear.year} />)
        }
    </div>;
}

const AlbumsInYearView: React.FC<{ data: AlbumsInYear }> = ({ data }) => {
    return (
        <div className={style.yearAlbums}>
            <div className={style.year}>{data.year}</div>
            {data.months.map(albumsInMonth => <AlbumsInMonthView data={albumsInMonth} key={albumsInMonth.month}/>)}
        </div>
    )
}

const AlbumsInMonthView: React.FC<{ data: AlbumsInMonth }> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className={style.monthAlbums}>
            <div className={style.month}>{data.month}</div>
            <div className={style.albums}>
                {data.albums.map(album => (
                    <div key={album.id} onClick={() => { navigate(album.permalink); }}>{album.name}</div>
                ))}    
            </div>                   
        </div>
    )
}

export default AlbumsDirectory;

