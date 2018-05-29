import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, debounceTime, distinctUntilChanged, map, publish, refCount, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';


export enum SpinnerEvent {
  STOP, START
}

let spinnerCount = 0;

const spinnerEventsSubject = new Subject<void>();
export const spinnerEvents$: Observable<SpinnerEvent> =
  spinnerEventsSubject
    .asObservable()
    .pipe(
      debounceTime(10),
      map(() => spinnerCount > 0 ? SpinnerEvent.START : SpinnerEvent.STOP),
      distinctUntilChanged(),
      tap(event => console.log(event)),
      publish(),
      refCount()
    );


export function spinnable<T>(observable: Observable<T>): Observable<T> {
  return of(true).pipe(
    tap(() => {
      spinnerCount++;
      spinnerEventsSubject.next();
    }),
    switchMap(() => observable),
    catchError(e => {
      spinnerCount--;
      spinnerEventsSubject.next();
      return Observable.throw(e);
    }),
    tap(() => {
      spinnerCount--;
      spinnerEventsSubject.next();
    })
  );
}


