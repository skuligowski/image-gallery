import { useContext } from "react";
import { AlbumsContext } from './AlbumsContext';

export const AlbumsTree: React.FC = () => {
    const { albums } = useContext(AlbumsContext);
    return (
        <ul>
            {albums.map(album => <li key={album.permalink}>{album.name}</li>)}
        </ul>
    );
}