import { Table, Tag } from 'antd';
import { selectAlbums } from 'src/state/albums/albumsSlice';
import { useAppSelector } from 'src/state/hooks';

const AlbumsList: React.FC = () => {
  const { albums, loading } = useAppSelector(selectAlbums);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Permalink',
      dataIndex: 'permalink',
      key: 'permalink',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (active ? <Tag color='green'>Active</Tag> : <Tag>Inactive</Tag>),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
  ];
  return !loading ? (
    <>
      <Table dataSource={albums} columns={columns} size="small" pagination={{pageSize: 20}}/>
    </>
  ) : null;
};

export default AlbumsList;
