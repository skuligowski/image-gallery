import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output, Renderer2 } from '@angular/core';

@Directive({selector: '[enter]'})
export class EnterDirective implements AfterViewInit, OnDestroy {

  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  @Output()
  enter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  private unregisterListener: () => void = () => {};

  ngAfterViewInit(): void {
    if (this.enter.observers.length !== 0) {
      this.unregisterListener = this.renderer.listen(this.element.nativeElement, 'keyup.enter', event => {
        this.enter.emit(event);
      });
    }
  }

  ngOnDestroy(): void {
    this.unregisterListener();
  }
}
