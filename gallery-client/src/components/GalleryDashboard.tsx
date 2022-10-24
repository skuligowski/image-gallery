import React, { useEffect } from 'react';
import style from './GalleryDashboard.module.scss';
import AlbumPreview from './AlbumPreview/AlbumPreview';
import SidePanel from './SidePanel/SidePanel';

export const GalleryDashboard: React.FC<{welcome?: boolean}> = ({welcome}) => {
    return (
        <div className={style.container}>
            <SidePanel />
            {welcome ? <div>welcome</div> : <AlbumPreview />}
        </div>
    )
}