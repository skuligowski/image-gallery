import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAlbum } from "../AlbumPreview/useAlbum";
import NextButton from "../Buttons/NextButton";
import PrevButton from "../Buttons/PrevButton";
import style from './NavigationPanel.module.scss';

const ImageControl: React.FC = () => {
    const { album, image } = useAlbum();
    const index = useMemo(() => {
        return album?.images.findIndex(item => item.filename === image?.filename);
    }, [image]);
    const navigate = useNavigate();
    const prevImage = () => {
        if (index !== undefined && index > -1 && album?.images[index - 1] !== undefined) {
            navigate(`${album?.permalink}/${album.images[index - 1].filename}`)
        }
    }
    const nextImage = () => {
        if (index !== undefined && index > -1 && album?.images[index + 1] !== undefined) {
            navigate(`${album?.permalink}/${album.images[index + 1].filename}`)
        }
    }
    return (
        <div className={style.imageControl}>
            <PrevButton onClick={prevImage} />
            <span className={style.pages}>{(index || 0) + 1} / {album?.images.length}</span>
            <NextButton onClick={nextImage} />
        </div>   
    );
}

export default ImageControl;