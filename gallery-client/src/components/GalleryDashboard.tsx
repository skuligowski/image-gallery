import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumPreview from './AlbumPreview/AlbumPreview';
import SidePanel from './SidePanel/SidePanel';
import { useAppDispatch } from '../state/hooks';
import { fetchAlbums } from '../state/albums/albumsSlice';
import { useAuthenticate } from '../state/user/useLogin';
import IndexPanel from './IndexPanel/IndexPanel';
import { fetchConfig } from '../state/config/configSlice';


function withAuthentication<T extends object>(Component: React.ComponentType<T>): React.FC<T> {
    return (props: T) => {
        const { authenticated } = useAuthenticate();
        return authenticated ? <Component {...props as T} /> : <></>;
    }
}
  

const GalleryDashboard: React.FC<{welcome?: boolean}> = withAuthentication(({welcome}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchConfig());
    }, []);
    return (
        <div className={style.container}>
            <SidePanel />
            {welcome ? <IndexPanel /> : <AlbumPreview />}
        </div>
    )
});

export default GalleryDashboard;