import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumPreview from './AlbumPreview/AlbumPreview';
import SidePanel from './SidePanel/SidePanel';
import { useAppDispatch } from '../state/hooks';
import { fetchAlbums } from '../state/albums/albumsSlice';
import IndexPanel from './IndexPanel/IndexPanel';
import { fetchConfig } from '../state/config/configSlice';
import { withAuth } from '../hooks/withAuth';
  

const GalleryDashboard: React.FC<{welcome?: boolean}> = withAuth(({welcome}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchConfig());
    }, []);
    return (
        <div className={style.container}>
            <SidePanel />
            {welcome ? <IndexPanel /> : <AlbumPreview />}
        </div>
    )
});

export default GalleryDashboard;