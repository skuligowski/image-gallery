import { debounceTime, distinctUntilChanged, finalize, map, publish, refCount, switchMap, tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';


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
      publish(),
      refCount()
    );


export function spinnable<T>(observable: Observable<T>, disabled?: boolean): Observable<T> {
  if (disabled) {
    return observable;
  }
  return of(true).pipe(
    tap(() => {
      spinnerCount++;
      spinnerEventsSubject.next();
    }),
    switchMap(() => observable),
    finalize(() => {
      spinnerCount--;
      spinnerEventsSubject.next();
    })
  );
}


