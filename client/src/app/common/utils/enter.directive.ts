import { AfterViewInit, Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';

@Directive({selector: '[enter]'})
export class EnterDirective implements AfterViewInit {
  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  @Output()
  enter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  ngAfterViewInit(): void {
    if (this.enter.observers.length !== 0) {
      console.log('register')
      this.renderer.listen(this.element.nativeElement, 'keyup.enter', event => {
        console.log(event);
        this.enter.emit(event);
      });
    }
  }
}
