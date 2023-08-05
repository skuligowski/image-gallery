import React, { useEffect } from 'react';
import style from './ClientPanel.module.scss';
import AlbumPreview from '../AlbumPreview/AlbumPreview';
import SidePanel from '../../shared/SidePanel/SidePanel';
import { useAppDispatch } from '../../../state/hooks';
import { fetchAlbums } from '../../../state/albums/albumsSlice';
import AlbumsTiles from '../AlbumsTiles/AlbumsTiles';
import { fetchConfig } from '../../../state/config/configSlice';
import { withAuth } from '../../../hooks/withAuth';
import ClientNavigationPanel from '../ClientNavigationPanel/ClientNavigationPanel';
import AlbumsDirectory from '../AlbumsDirectory/AlbumsDirectory';
import { useTranslation } from 'react-i18next';
  

const GalleryDashboard: React.FC<{welcome?: boolean}> = withAuth(({welcome}) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchConfig());
    }, []);
    return (
        <div className={style.container}>
            <SidePanel title={t('Albums')}>
                <AlbumsDirectory />
            </SidePanel>
            <div className={style.contentContainer}>
                <ClientNavigationPanel />
                {welcome ? <AlbumsTiles /> : <AlbumPreview />}
            </div>
        </div>
    )
});

export default GalleryDashboard;