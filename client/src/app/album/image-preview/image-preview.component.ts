import { Component, Input } from '@angular/core';
import { CurrentAlbum, CurrentImage } from '../../album.resolver';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs/index';
import { debounceTime } from 'rxjs/internal/operators';
import { AlbumsService } from '../../albums.service';
import { ConfigService } from '../../core/config/config.service';

const spinnerAnimation = trigger('spinnerAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 0 }))
  ]),
]);

const imageAnimation = trigger('imageAnimation', [
  state('loading', style({opacity: 0})),
  transition('loading => loaded', [
    style({ opacity: 0 }),
    animate('.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 1 }))
  ]),
]);

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  animations: [ spinnerAnimation, imageAnimation ],
})
export class ImagePreviewComponent {

  @Input()
  set album(album: CurrentAlbum) {
    this.currentAlbum = album;
    this.currentImage = album.currentImage;
    this.loadingSubject.next(true);
    this.imageState = 'loading';
  }

  currentAlbum: CurrentAlbum;
  currentImage: CurrentImage;

  get imageDownloadLink(): string {
    return `/api/albums/${this.currentAlbum.id}/images/${this.currentImage.filename}`;
  }

  imageState: 'loading' | 'loaded';
  loadingSubject: Subject<boolean> = new BehaviorSubject(false);
  loading$: Observable<boolean> = this.loadingSubject
    .asObservable()
    .pipe(
      debounceTime(100)
    );

  loadedImageUrls: Set<string> = new Set<string>();

  setImageLoaded(): void {
    this.loadingSubject.next(false);
    this.imageState = 'loaded';
    this.loadedImageUrls.add(this.currentImage.url);
  }

  next(): void {
    if (this.currentImage.nextImage) {
      this.router.navigate(this.getAlbumUrl(this.currentImage.nextImage.filename));
    }
  }

  previous(): void {
    if (this.currentImage.previousImage) {
      this.router.navigate(this.getAlbumUrl(this.currentImage.previousImage.filename));
    }
  }

  close(): void {
    this.router.navigate(this.getAlbumUrl());
  }

  chooseAlbum(): void {
    this.router.navigate([{outlets: { modal: 'album/select'}}], { queryParams: {albumId: this.currentAlbum.id}});
  }

  private getAlbumUrl(...other): string[] {
    return ['albums'].concat(this.currentAlbum.permalink.split('/')).concat(other);
  }

  constructor(private router: Router, public config: ConfigService) { }

}

