import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlbumsService } from './albums.service';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import AlbumDetails = Definitions.AlbumDetails;
import Image = Definitions.Image;


@Injectable()
export class AlbumResolver implements Resolve<CurrentAlbum> {

  constructor(private albumsService: AlbumsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CurrentAlbum> | Promise<CurrentAlbum> | CurrentAlbum {
    return this.albumsService.getAlbumDetails(route.params.albumPermalink).pipe(
      map(album => {
        const imageIndex: number = album.images.findIndex(image => image.filename === route.params.imageFilename);
        let currentImage: CurrentImage;
        if (imageIndex !== -1) {
          currentImage = {
            ... album.images[imageIndex],
            nextImage: album.images[imageIndex + 1],
            previousImage: album.images[imageIndex - 1],
            currentNumber: imageIndex + 1,
            totalNumber: album.images.length
          };
        }
        return {... album, currentImage };
      }),
      tap( currentAlbum => {
        if (!currentAlbum.currentImage && route.params.imageFilename) {
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
  currentImage?: CurrentImage;
}

export interface CurrentImage extends Image {
  nextImage?: Image;
  previousImage?: Image;
  currentNumber: number;
  totalNumber: number;
}
