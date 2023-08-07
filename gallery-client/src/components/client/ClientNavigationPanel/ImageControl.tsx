import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../../shared/Buttons/NextButton';
import PrevButton from '../../shared/Buttons/PrevButton';
import { useAlbum } from '../AlbumPreview/useAlbum';
import style from './ClientNavigationPanel.module.scss';

const ImageControl: React.FC<{
  prevClassName: string;
  nextClassName: string;
}> = ({ prevClassName, nextClassName }) => {
  const { album, image } = useAlbum();
  const index = useMemo(() => {
    return album?.images.findIndex((item) => item.filename === image?.filename);
  }, [image]);
  const navigate = useNavigate();
  const prevImage = () => {
    if (index !== undefined && index > -1 && album?.images[index - 1] !== undefined) {
      navigate(`${album?.permalink}/${album.images[index - 1].filename}`);
    }
  };
  const nextImage = () => {
    if (index !== undefined && index > -1 && album?.images[index + 1] !== undefined) {
      navigate(`${album?.permalink}/${album.images[index + 1].filename}`);
    }
  };
  return (
    <div className={style.imageControl}>
      <PrevButton onClick={prevImage} className={prevClassName} disabled={index === 0} />
      <span className={style.pages}>
        {(index || 0) + 1} / {album?.images.length}
      </span>
      <NextButton onClick={nextImage} className={nextClassName} disabled={index === (album?.images || []).length - 1} />
    </div>
  );
};

export default ImageControl;
