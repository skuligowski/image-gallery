import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAlbum } from "../AlbumPreview/useAlbum";
import ImageClose from "./ImageClose";
import ImageControl from "./ImageControl";
import style from './NavigationPanel.module.scss';
import Breadcrumb from './Breadcrumb';

const NavigationPanel: React.FC = () => {
    const { image } = useAlbum();
    return (
        <div className={style.navigation}>
            <Breadcrumb />
            {image ? 
            <>
                <ImageControl />
                <ImageClose />
            </> : null }
        </div>
    );
}

export default NavigationPanel;