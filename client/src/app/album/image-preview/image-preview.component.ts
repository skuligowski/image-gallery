import { Component, Input } from '@angular/core';
import { CurrentAlbum, CurrentImage } from '../../album.resolver';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0}),
    animate('0.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 1 }))
  ]),
]);


@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  animations: [ fadeInAnimation ],
})
export class ImagePreviewComponent {

  @Input()
  set album(album: CurrentAlbum) {
    this.currentAlbum = album;
    this.currentImage = album.currentImage;
  }

  currentAlbum: CurrentAlbum;
  currentImage: CurrentImage;

  next(): void {
    if (this.currentImage.nextImage) {
      this.router.navigate(['albums'].concat(this.currentAlbum.permalink.split('/')).concat(this.currentImage.nextImage.filename));
    }
  }

  previous(): void {
    if (this.currentImage.previousImage) {
      this.router.navigate(['albums'].concat(this.currentAlbum.permalink.split('/')).concat(this.currentImage.previousImage.filename));
    }
  }

  close(): void {
    this.router.navigate(['albums'].concat(this.currentAlbum.permalink.split('/')));
  }

  constructor(private router: Router) { }

}
