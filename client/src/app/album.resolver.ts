import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlbumsService } from './albums.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import AlbumDetails = Definitions.AlbumDetails;


@Injectable()
export class AlbumResolver implements Resolve<AlbumDetails> {

  constructor(private albumsService: AlbumsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AlbumDetails> | Promise<AlbumDetails> | AlbumDetails {
    return this.albumsService.getAlbumDetails(route.params.albumPermalink).pipe(
      catchError((e) => {
        this.router.navigate(['/']);
        return of<AlbumDetails>();
      })
    );

  }
}
