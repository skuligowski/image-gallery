import { useEffect } from 'react';
import { useConfig } from '../../../hooks/useConfig';
import { resetAlbum } from '../../../state/albums/albumSlice';
import { selectAlbums } from '../../../state/albums/albumsSlice';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { Album } from '../../../types/api';
import LazyLoadingGrid from '../../shared/LazyLoadingGrid/LazyLoadingGrid';
import AlbumsGrid from './AlbumsGrid/AlbumsGrid';
import style from './AlbumsTiles.module.scss';

const IndexPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { albums, loading } = useAppSelector(selectAlbums);
  const { config } = useConfig();
  useEffect(() => {
    dispatch(resetAlbum());
  }, []);
  return (
    <div className={style.container}>
      {!loading ? <LazyLoadingGrid<Album> render={(albums) => <AlbumsGrid albums={albums} />} items={albums} /> : null}
    </div>
  );
};

export default IndexPanel;
