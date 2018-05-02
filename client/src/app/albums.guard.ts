import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlbumsService } from './albums.service';
import { map } from 'rxjs/operators';


@Injectable()
export class AlbumsGuard implements CanActivate {

  constructor(private albumsService: AlbumsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const albums = this.albumsService.getAlbums();
    return albums ? true : this.albumsService.loadAlbums().pipe(map(() => true));
  }

}
