import NavigationPanel from "../NavigationPanel/NavigationPanel";
import style from './AlbumsTiles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { useEffect } from 'react';
import { resetAlbum } from "../../../state/albums/albumSlice";
import { useConfig } from "../../../hooks/useConfig";
import AlbumsGrid from "./AlbumsGrid/AlbumsGrid";
import { selectAlbums } from "../../../state/albums/albumsSlice";
import { Album } from "../../../types/api";
import LazyLoadingGrid from "../../shared/LazyLoadingGrid/LazyLoadingGrid";

const IndexPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { albums, loading } = useAppSelector(selectAlbums);
    const { config } = useConfig();
    useEffect(() => {
        dispatch(resetAlbum());
    }, []);
    return (
        <div className={style.container}>
            <NavigationPanel />    
            { !loading ? (
                <LazyLoadingGrid<Album> 
                    render={albums => <AlbumsGrid albums={albums}/>} 
                    items={albums} />
            ) : null }
        </div>
    );
}

export default IndexPanel;