import { useNavigate } from "react-router-dom";
import { useAlbum } from "../AlbumPreview/useAlbum";
import CloseButton from "../Buttons/CloseButton"
import style from './NavigationPanel.module.scss';

const ImageClose: React.FC = () => {
    const { album } = useAlbum();
    const navigate = useNavigate();
    const close = () => {
        navigate(`${album?.permalink}`)
    }
    return (
        <div className={style.close}>
            <CloseButton onClick={close} />
        </div>
    )
}

export default ImageClose;