import { Button } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import SidePanel from 'src/components/shared/SidePanel/SidePanel';
import { withAdminAuth } from 'src/hooks/withAdminAuth';
import { fetchAlbums } from 'src/state/albums/albumsSlice';
import { fetchConfig } from 'src/state/config/configSlice';
import { useAppDispatch } from 'src/state/hooks';
import AdminNavigationPanel from '../AdminNavigationPanel/AdminNavigationPanel';
import AlbumsList from '../AlbumsList/AlbumsList';
import style from './AdminPanel.module.scss';

const AdminPanel: React.FC = withAdminAuth(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchConfig());
  }, []);
  return (
    <div className={style.container}>
      <SidePanel title={t('Admin')}>
        <nav>
          <div>Albums</div>
        </nav>
      </SidePanel>
      <div className={style.contentContainer}>
        <AdminNavigationPanel />
        <div>
          <Button type="primary">Button</Button>
          <Routes>
            <Route path="/albums" element={<AlbumsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
});
export default AdminPanel;
