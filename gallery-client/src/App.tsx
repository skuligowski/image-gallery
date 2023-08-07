import style from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClientPanel from './components/client/ClientPanel/ClientPanel';
import LoginPanel from './components/login/LoginPanel/LoginPanel';
import { useAppSelector } from './state/hooks';
import { selectLayout } from './state/layout/layoutSlice';
import { lazy, Suspense } from 'react';
import { FullScreenLoader } from './components/shared/Loader/Loader';

const AdminPanel = lazy(() => import('./components/admin/AdminPanel/AdminPanel'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPanel />,
  },
  {
    path: '/admin/*',
    element: <AdminPanel />,
  },
  {
    path: '/albums/',
    element: <ClientPanel welcome={true} />,
  },
  {
    path: '/albums/*',
    element: <ClientPanel />,
  },
  {
    path: '/*',
    element: <ClientPanel welcome={true} />,
  },
]);

function App() {
  const { loading } = useAppSelector(selectLayout);
  return (
    <>
      {loading ? <FullScreenLoader /> : null}
      <div className={style.app}>
        <Suspense fallback={<FullScreenLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
