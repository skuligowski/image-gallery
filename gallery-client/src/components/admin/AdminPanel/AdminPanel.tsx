import { withAdminAuth } from "../../../hooks/withAdminAuth";
import { useAppDispatch } from "../../../state/hooks";
import { useEffect } from "react";
import { fetchAlbums } from "../../../state/albums/albumsSlice";
import { fetchConfig } from "../../../state/config/configSlice";
import SidePanel from "../../client/SidePanel/SidePanel";
import style from "./AdminPanel.module.scss";
import NavigationPanel from "../../client/NavigationPanel/NavigationPanel";

const AdminPanel: React.FC = withAdminAuth(() => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchConfig());
    }, []);
    return (
        <div className={style.container}>
            <SidePanel />
            <div>
                <NavigationPanel />
                <div>Hello Admin</div>
            </div>
        </div>
    )
})
export default AdminPanel;
  