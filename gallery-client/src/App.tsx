import React from 'react';
import style from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GalleryDashboard } from './components/GalleryDashboard';


const router = createBrowserRouter([
  {
    path: "/albums",
    element: <GalleryDashboard welcome={true}/>,
  },
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
