import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AlbumDetails, AlbumsService } from '../albums.service';
import { of, Observable } from 'rxjs';


@Injectable()
export class AlbumDetailsResolver implements Resolve<AlbumDetails> {

  constructor(private albumsService: AlbumsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AlbumDetails> {
    return this.albumsService.getAlbumDetailsById(route.params.id).pipe(
      catchError((e) => {
        this.router.navigate(['/admin']);
        return of<AlbumDetails>();
      })
    );
  }
}

