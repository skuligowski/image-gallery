import React, { useEffect } from 'react';
import style from './App.module.scss';
import { fetchAlbums, selectAlbums } from './app/albums/albumsSlice';
import { useAppDispatch } from './app/hooks';
import { useSelector } from 'react-redux';
import AlbumsDirectory from './components/AlbumsDirectory';
import AlbumPreview from './components/AlbumPreview';

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(selectAlbums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);
  
  return (
    <div className={style.app}>
      {loading ? 'Loading albums ....' : (
        <>
          <AlbumsDirectory />
          <AlbumPreview />
        </>
      )
      }
    </div>
  );
}

export default App;
