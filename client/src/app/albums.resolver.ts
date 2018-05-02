import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import Album = Definitions.Album;

@Injectable()
export class AlbumsResolver implements Resolve<Album[]> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album[]> | Promise<Album[]> | Album[] {
    return [
      { permalink: '/2018/best-ever', name: 'Best ever album'}
    ];
  }
}
