import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumPreview from './AlbumPreview/AlbumPreview';
import SidePanel from './SidePanel/SidePanel';
import { useAppDispatch } from '../state/hooks';
import { fetchAlbums } from '../state/albums/albumsSlice';
import { useAuthenticate } from './LoginPanel/useLogin';

export const GalleryDashboard: React.FC<{welcome?: boolean}> = ({welcome}) => {
    const dispatch = useAppDispatch();
    const { authenticated } = useAuthenticate();
    useEffect(() => {
        if (authenticated) {
            dispatch(fetchAlbums());
        }
    }, [authenticated]);
    return (
        authenticated ? (
            <div className={style.container}>
                <SidePanel />
                {welcome ? <div>welcome</div> : <AlbumPreview />}
            </div>
        ) : null
    )
}