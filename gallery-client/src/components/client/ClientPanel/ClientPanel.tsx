import React, { useEffect } from 'react';
import style from './ClientPanel.module.scss';
import AlbumPreview from '../AlbumPreview/AlbumPreview';
import SidePanel from '../SidePanel/SidePanel';
import { useAppDispatch } from '../../../state/hooks';
import { fetchAlbums } from '../../../state/albums/albumsSlice';
import AlbumsTiles from '../AlbumsTiles/AlbumsTiles';
import { fetchConfig } from '../../../state/config/configSlice';
import { withAuth } from '../../../hooks/withAuth';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
  

const GalleryDashboard: React.FC<{welcome?: boolean}> = withAuth(({welcome}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchConfig());
    }, []);
    return (
        <div className={style.container}>
            <SidePanel />
            <div className={style.contentContainer}>
                <NavigationPanel />
                {welcome ? <AlbumsTiles /> : <AlbumPreview />}
            </div>
        </div>
    )
});

export default GalleryDashboard;