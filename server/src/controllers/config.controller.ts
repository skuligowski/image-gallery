const config = require('../core/config');
import { Request, Response } from 'express';
import { Config, User } from '../api';
import { api } from '../core/db';
import { AlbumDTO } from '../model/AlbumDTO';

function getConfig(req: Request & { user: User }, res: Response) {
  Promise.resolve()
    .then(() => ({
        galleryName: config.galleryName,
        dashboardTilesCount: config.dashboardTilesCount,
        dashboardImageUrl: config.dashboardImageUrl,
        imageDownload: config.imageDownload,
    }))
    .then(config => config.dashboardImageUrl ? config : getLastRecentImageUrl(config, req))
    .then(config => res.status(200).send(config));
};

function getLastRecentImageUrl(config: Config, req: Request & { user: User }) {
  return new Promise((resolve) => {
    const predicate = req.user && req.user.admin ? {} : {active: true};
    api.albums.find(predicate).sort({lastModified: -1}).limit(1).exec((_err: any, albums: AlbumDTO[]) => {
      if (albums.length && albums[0].images.length) {
        config.dashboardImageUrl = albums[0].images[0].url;
      } else {
        delete config['dashboardImageUrl'];
      }
      resolve(config);
    });
  });
}

module.exports = { getConfig };
