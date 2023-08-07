import { selectAlbums } from 'src/state/albums/albumsSlice';
import { useAppSelector } from 'src/state/hooks';

const AlbumsList: React.FC = () => {
  const { albums, loading } = useAppSelector(selectAlbums);

  return !loading ? (
    <>
      {albums.map((album) => (
        <div key={album.id}>{album.name}</div>
      ))}
    </>
  ) : null;
};

export default AlbumsList;
