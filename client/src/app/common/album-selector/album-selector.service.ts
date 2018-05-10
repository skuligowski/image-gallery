import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlbumSelectorService {

  open$: Subject<void> = new Subject();

}
