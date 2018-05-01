import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Album} from './album/album.component';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlbumsResolver implements Resolve<Album[]> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album[]> | Promise<Album[]> | Album[] {
    return [
      { permalink: '/2018/best-ever'}
    ];
  }
}
