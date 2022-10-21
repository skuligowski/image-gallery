import React, { useEffect } from 'react';
import style from './App.module.scss';
import { fetchAlbums, selectAlbums } from './app/albums/albumsSlice';
import { useAppDispatch } from './app/hooks';
import { useSelector } from 'react-redux';
import AlbumsDirectory from './components/AlbumsDirectory';
import AlbumPreview from './components/AlbumPreview';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GalleryDashboard } from './components/GalleryDashboard';


const router = createBrowserRouter([
  {
    path: "/albums/*",
    element: <GalleryDashboard />,
  },
]);

function App() { 
  return (
    <div className={style.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
