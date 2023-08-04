import React, { useCallback, useMemo } from 'react';
import { selectAlbums } from '../../../state/albums/albumsSlice';
import { useAppSelector } from '../../../state/hooks';
import { useNavigate } from 'react-router-dom';
import style from './AlbumsDirectory.module.scss';
import { AlbumsInMonth, AlbumsInYear, groupAlbumsByYear } from './groupAlbumsByYear';
import { groupAlbumsNoDate } from './groupAlbumsNoDate';
import { useToggleSidePanel } from '../../../hooks/useLayout';
import { isMobile } from '../../../state/layout/isMobile';
import { useTranslation } from 'react-i18next';

const useMonthNames = () => {
    const { t } = useTranslation();
    return useMemo(() => ([
        t('Jan'), t('Feb'), t('Mar'),
        t('Apr'), t('May'), t('Jun'),
        t('Jul'), t('Aug'), t('Sep'),
        t('Oct'),  t('Mov'), t('Dec')
    ]), []);
}

const AlbumsDirectory: React.FC = () => {    
    const { albums, loading } = useAppSelector(selectAlbums);
    const monthNames = useMonthNames();
    const [groupedByYear, withoutDate] = useMemo(() => 
        [groupAlbumsByYear(albums || [], monthNames), groupAlbumsNoDate(albums || [])], [albums]);

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
    const toggle = useToggleSidePanel();
    const handleNavigate = useCallback((permalink: string) => {
        navigate(`/albums/${permalink}`);
        if (isMobile()) {
            toggle(false);
        }
    }, []);
    return (
        <div className={style.monthAlbums}>
            <div className={style.month}>{data.month}</div>
            <div className={style.albums}>
                {data.albums.map(album => (
                    <div key={album.id} onClick={() => handleNavigate(album.permalink)}>{album.name}</div>
                ))}    
            </div>                   
        </div>
    )
}

export default AlbumsDirectory;

