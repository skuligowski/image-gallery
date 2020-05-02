import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlbumSelectorService {

  open$: Subject<void> = new Subject();

}
