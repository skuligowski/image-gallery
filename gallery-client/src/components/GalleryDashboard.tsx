import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumsDirectory from './AlbumsDirectory';
import AlbumPreview from './AlbumPreview';

export const GalleryDashboard: React.FC = () => {
    return (
        <div className={style.dashboard}>
            <AlbumsDirectory />
            <AlbumPreview />
        </div>
    )
}