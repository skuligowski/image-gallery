import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumPreview from './AlbumPreview/AlbumPreview';
import SidePanel from './SidePanel/SidePanel';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchAlbums, selectAlbums } from '../state/albums/albumsSlice';
import Loader from './Loader/Loader';

export const GalleryDashboard: React.FC<{welcome?: boolean}> = ({welcome}) => {
    const { loading } = useAppSelector(selectAlbums);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAlbums());
    }, []);
    return (
        <div className={style.container}>
            { loading ? (
                <Loader />
            ) : (
                <>
                    <SidePanel />
                    {welcome ? <div>welcome</div> : <AlbumPreview />}
                </>
            )}
        </div>
    )
}