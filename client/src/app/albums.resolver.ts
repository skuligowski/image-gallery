import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AlbumsService } from './albums.service';
import Album = Definitions.Album;
import { Observable } from 'rxjs';


@Injectable()
export class AlbumsResolver implements Resolve<Album[]> {

  constructor(private albumsService: AlbumsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album[]> | Promise<Album[]> | Album[] {
    return this.albumsService.getAlbums();
  }
}
