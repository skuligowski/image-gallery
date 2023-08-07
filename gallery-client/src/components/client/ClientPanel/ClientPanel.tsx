import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { withAuth } from '../../../hooks/withAuth';
import { fetchAlbums } from '../../../state/albums/albumsSlice';
import { fetchConfig } from '../../../state/config/configSlice';
import { useAppDispatch } from '../../../state/hooks';
import SidePanel from '../../shared/SidePanel/SidePanel';
import AlbumPreview from '../AlbumPreview/AlbumPreview';
import AlbumsDirectory from '../AlbumsDirectory/AlbumsDirectory';
import AlbumsTiles from '../AlbumsTiles/AlbumsTiles';
import ClientNavigationPanel from '../ClientNavigationPanel/ClientNavigationPanel';
import style from './ClientPanel.module.scss';

const GalleryDashboard: React.FC<{ welcome?: boolean }> = withAuth(({ welcome }) => {
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
  );
});

export default GalleryDashboard;
