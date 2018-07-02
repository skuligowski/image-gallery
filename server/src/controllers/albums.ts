import { Request, Response } from 'express';
import { Swagger12Request } from 'swagger-tools';
import Image = Definitions.Image;

interface MockedAlbum {
  id: string;
  permalink: string;
  name: string;
  tree: string[];
  images: Image[];
  lastModified: string;
}

const albums: MockedAlbum[] = [{
  id: '1',
  permalink: '2018/best-ever',
  name: 'Best album ever',
  tree: ['2018', 'Best ever'],
  lastModified: '2018-07-01T20:23:00.412Z',
  images: [
    {url: 'assets/some_1.jpg', filename: 'some_1.jpg', width: 1500, height: 1000},
    {url: 'assets/some_3.jpg', filename: 'some_2.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_3.jpg', width: 1200, height: 800},
    {url: 'assets/some_3.jpg', filename: 'some_4.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_5.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_6.jpg', width: 1500, height: 1000},
    {url: 'assets/some_1.jpg', filename: 'some_7.jpg', width: 1500, height: 1000},
    {url: 'assets/some_3.jpg', filename: 'some_8.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_9.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_10.jpg', width: 1500, height: 1000}
  ]
}, {
  id: '2',
  permalink: '2018/other-album',
  name: 'Other album',
  tree: ['2018', 'Other album'],
  lastModified: '2018-03-01T20:23:00.412Z',
  images: [
    {url: 'assets/some_3.jpg', filename: 'some_42.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_52.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_62.jpg', width: 1500, height: 1000},
  ]
}];

export function getAlbums(req: Request, res: Response): void {
  res.send(albums.map(album => ({
    id: album.id,
    permalink: album.permalink,
    name: album.name,
    tree: album.tree,
    lastModified: album.lastModified,
    thumbUrl: album.images[0].url,
    size: album.images.length
  })));
}

export function getImages(req: Swagger12Request, res: Response): void {
  const albumId = req.swagger.params.id.value;
  const album: MockedAlbum = albums.find(album => album.id === albumId);
  if (!album) {
    res.status(404).send()
  } else {
    res.send(album.images);
  }
}
