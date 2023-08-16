import { Tag } from 'antd';
import { memo, useMemo } from 'react';
import { selectAlbums } from 'src/state/albums/albumsSlice';
import { useAppSelector } from 'src/state/hooks';
import { Album } from 'src/types/api';
import style from './AlbumsList.module.scss';

const monthMapping: { [key: string]: string } = {
  '01': 'sty',
  '02': 'lut',
  '03': 'mar',
  '04': 'kwi',
  '05': 'maj',
  '06': 'cze',
  '07': 'lip',
  '08': 'sie',
  '09': 'wrz',
  '10': 'paz',
  '11': 'lis',
  '12': 'gru',
};

const compareFn = (a: Album, b: Album): number => (a.date && b.date ? b.date.localeCompare(a.date) : 0);

const AlbumsList: React.FC = () => {
  const { albums, loading } = useAppSelector(selectAlbums);
  const albumsSorted = useMemo(() => [...albums].sort(compareFn), [albums]);

  return !loading ? <AlbumsListView albums={albumsSorted} /> : null;
};

const AlbumsListView: React.FC<{ albums: Album[] }> = memo(({ albums }) => (
  <div>
    {albums.map((album) => (
      <div key={album.id} className={style.albumView}>
        <div className={style.imageWrapper}>
          <img loading="lazy" src={'/library' + album.thumbUrl} />
        </div>
        <div className={style.albumData}>
          <div>
            <div className={style.name}>{album.name}</div>
            <div className={style.permalink}>{album.permalink}</div>
            <div>{album.active ? <Tag color="green">Active</Tag> : <Tag>Inactive</Tag>}</div>
          </div>
          <div>
            <span className={style.year}>&nbsp;{album.date?.substring(0, 4) || ''}</span>
            <span className={style.month}> | {monthMapping[album.date?.substring(5, 7) || '']}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
));

export default AlbumsList;
