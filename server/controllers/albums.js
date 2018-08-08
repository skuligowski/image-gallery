"use strict";
const albums = [{
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

function getAlbums(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
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

function getImages(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
  const albumId = req.swagger.params.id.value;
  const album = albums.find(album => album.id === albumId);
  if (!album) {
    res.status(404).send();
  }
  else {
    res.send(album.images);
  }
}

exports.getImages = getImages;
exports.getAlbums = getAlbums;
