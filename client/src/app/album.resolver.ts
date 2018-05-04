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
        const photoIndex: number = album.photos.findIndex(photo => photo.filename === route.params.photoFilename);
        let currentPhoto: CurrentPhoto;
        if (photoIndex !== -1) {
          currentPhoto = {
            ... album.photos[photoIndex],
            nextPhoto: album.photos[photoIndex + 1],
            previousPhoto: album.photos[photoIndex - 1],
            currentNumber: photoIndex + 1,
            totalNumber: album.photos.length
          };
        }
        return {... album, currentPhoto };
      }),
      tap( currentAlbum => {
        if (!currentAlbum.currentPhoto && route.params.photoFilename) {
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
  currentPhoto?: CurrentPhoto;
}

export interface CurrentPhoto extends Photo {
  nextPhoto?: Photo;
  previousPhoto?: Photo;
  currentNumber: number;
  totalNumber: number;
}
