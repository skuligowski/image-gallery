import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AlbumDetails, AlbumsService } from '../albums.service';


@Injectable()
export class AlbumDetailsResolver implements Resolve<AlbumDetails> {

  constructor(private albumsService: AlbumsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AlbumDetails> {
    return this.albumsService.getAlbumDetailsById(route.params.id).pipe(
      catchError((e) => {
        console.log(e);
        this.router.navigate(['/']);
        return of<AlbumDetails>();
      })
    );
  }
}

