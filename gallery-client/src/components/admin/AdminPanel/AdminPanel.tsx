import { withAdminAuth } from "../../../hooks/withAdminAuth";
import { useAppDispatch } from "../../../state/hooks";
import { useEffect } from "react";
import { fetchAlbums } from "../../../state/albums/albumsSlice";
import { fetchConfig } from "../../../state/config/configSlice";
import SidePanel from "../../shared/SidePanel/SidePanel";
import style from "./AdminPanel.module.scss";
import AdminNavigationPanel from "../AdminNavigationPanel/AdminNavigationPanel";
import { useTranslation } from "react-i18next";
import { Outlet, Route, Routes } from "react-router-dom";
import AlbumsList from "../AlbumsList/AlbumsList";

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
                <Routes>
                    <Route path="/albums" element={<AlbumsList />} />
                </Routes>
                </div>
            </div>
            
        </div>
    )
})
export default AdminPanel;
  