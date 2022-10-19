import React from 'react';
import { selectAlbums } from '../app/albums/albumsSlice';
import { selectAlbum } from '../app/albums/albumSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const AlbumsDirectory: React.FC = () => {    
    const dispatch = useAppDispatch();
    const { albums, loading } = useAppSelector(selectAlbums);
    return <div>
        {loading ? null : 
            albums.map(album => <div key={album.id} onClick={() => dispatch(selectAlbum(album))}>{album.name}</div>)
        }
    </div>;
}

export default AlbumsDirectory;