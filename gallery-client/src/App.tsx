import style from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GalleryDashboard } from './components/GalleryDashboard';
import LoginPanel from './components/LoginPanel/LoginPanel';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { fetchUser, selectUser } from './state/user/userSlice';
import { useEffect } from 'react';
import { selectLayout } from './state/layout/layoutSlice';
import { FullScreenLoader } from './components/Loader/Loader';
import { useNavigate } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPanel />,
  },
  {
    path: "/albums/",
    element: <GalleryDashboard welcome={true}/>,
  },
  {
    path: "/albums/*",
    element: <GalleryDashboard />,
  },
  {
    path: "/*",
    element: <GalleryDashboard welcome={true}/>,
  },
]);

function App() { 
  const { loading } = useAppSelector(selectLayout);
  return (
    <>
      {loading ? <FullScreenLoader /> : null }
      <div className={style.app}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
