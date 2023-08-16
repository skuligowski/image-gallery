import { PictureOutlined, ReadOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, theme } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Routes } from 'react-router-dom';
import SidePanel from 'src/components/shared/SidePanel/SidePanel';
import { withAdminAuth } from 'src/hooks/withAdminAuth';
import { fetchAlbums } from 'src/state/albums/albumsSlice';
import { fetchConfig } from 'src/state/config/configSlice';
import { useAppDispatch } from 'src/state/hooks';
import AdminNavigationPanel from '../AdminNavigationPanel/AdminNavigationPanel';
import AlbumsList from '../AlbumsList/AlbumsList';
import LibraryBrowser from '../LibraryBrowser/LibraryBrowser';
import Settings from '../Settings/Settings';
import Users from '../Users/Users';
import style from './AdminPanel.module.scss';

const classNameFn = ({ isActive = false, isPending = false }) => (isActive || isPending ? style.active : '');

const AdminPanel: React.FC = withAdminAuth(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchConfig());
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: [theme.darkAlgorithm], token: { colorBgContainer: '#1e2021' } }}>
      <div className={style.container}>
        <SidePanel title={t('Admin')}>
          <nav className={style.nav}>
            <NavLink to="/admin/albums" className={classNameFn}>
              <PictureOutlined />
              <span>Albums</span>
            </NavLink>
            <NavLink
              to="/admin/library"
              className={({ isActive, isPending }) => (isPending || isActive ? style.active : '')}
            >
              <ReadOutlined />
              <span>Library</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive, isPending }) => (isPending || isActive ? style.active : '')}
            >
              <UserOutlined />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive, isPending }) => (isPending || isActive ? style.active : '')}
            >
              <SettingOutlined />
              <span>Settings</span>
            </NavLink>
          </nav>
        </SidePanel>
        <div className={style.contentSide}>
          <AdminNavigationPanel />
          <div className={style.contentContainer}>
            <Routes>
              <Route path="/albums" element={<AlbumsList />} />
              <Route path="/library" element={<LibraryBrowser />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
});
export default AdminPanel;
