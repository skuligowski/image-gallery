import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumsDirectory from './AlbumsDirectory/AlbumsDirectory';
import AlbumPreview from './AlbumPreview/AlbumPreview';

export const GalleryDashboard: React.FC<{welcome?: boolean}> = ({welcome}) => {
    return (
        <div className={style.container}>
            <AlbumsDirectory />
            {welcome ? <div>welcome</div> : <AlbumPreview />}
        </div>
    )
}