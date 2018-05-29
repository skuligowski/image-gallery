import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SpinnerEvent, spinnerEvents$ } from '../utils/spinnable';
import { filter, first } from 'rxjs/operators';

@Injectable()
export class SplashService {

  renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  attachSplash(splashElement: Element): void  {
    spinnerEvents$
      .pipe(
        filter(event => event === SpinnerEvent.STOP),
        first()
      ).subscribe(() => this.destroy(splashElement));
  }

  private destroy(splashElement: Element): void {
    this.renderer.addClass(splashElement, 'stopped');
    const unregisterFn = this.renderer.listen(splashElement, 'webkitTransitionEnd', () => {
      this.renderer.removeChild(splashElement.parentElement, splashElement);
      unregisterFn();
    });
  }

}
