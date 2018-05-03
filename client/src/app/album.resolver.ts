import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlbumsService } from './albums.service';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import AlbumDetails = Definitions.AlbumDetails;
import Photo = Definitions.Photo;


@Injectable()
export class AlbumResolver implements Resolve<CurrentAlbum> {

  constructor(private albumsService: AlbumsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CurrentAlbum> | Promise<CurrentAlbum> | CurrentAlbum {
    return this.albumsService.getAlbumDetails(route.params.albumPermalink).pipe(
      map(album => {
        const photo: Photo = album.photos.find(photo => photo.filename === route.params.photoFilename);
        return {... album, photo };
      }),
      tap( currentAlbum => {
        if (!currentAlbum.photo && route.params.photoFilename) {
          this.router.navigateByUrl('/albums/' + currentAlbum.permalink);
        }
      }),
      catchError((e) => {
        this.router.navigate(['/']);
        return of<CurrentAlbum>();
      })
    );
  }
}

export interface CurrentAlbum extends AlbumDetails {
  photo?: Photo;
}
