import { Pipe, PipeTransform } from '@angular/core';
import Image = Definitions.Image;
import { CurrentImage } from '../../album.resolver';

@Pipe({name: 'appCurrentImage'})
export class CurrentImagePipe implements PipeTransform {
  transform(images: Image[], currentImage: CurrentImage): Image[] {
    return images.filter(image => image.filename === currentImage.filename);
  }
}
