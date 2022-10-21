import React, { useEffect } from 'react';
import { fetchAlbums, selectAlbums } from '../app/albums/albumsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import style from './AlbumsDirectory.module.scss';

const AlbumsDirectory: React.FC = () => {    
    const dispatch = useAppDispatch();
    const { albums, loading } = useAppSelector(selectAlbums);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAlbums());
    }, []);

    return <div className={style.sidePanel}>
        {loading ? null : 
            albums.map(album => <div key={album.id} onClick={() => {
                navigate(album.permalink);
            }}>{album.name}</div>)
        }
    </div>;
}

export default AlbumsDirectory;