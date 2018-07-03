import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SpinnerEvent, spinnerEvents$ } from '../utils/spinnable';
import { filter, first } from 'rxjs/operators';

@Injectable()
export class SplashService {

  renderer: Renderer2;
  splashElement: Element;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  registerSplash(splashElement: Element): void {
    this.splashElement = splashElement;
  }

  closeOnSpinnerEnd(): void  {
    if (this.splashElement) {
      spinnerEvents$
        .pipe(
          filter(event => event === SpinnerEvent.STOP),
          first(),
        ).subscribe(() => this.closeAndDestroy());
    }
  }

  close(): void {
    this.closeAndDestroy();
  }

  private closeAndDestroy() {
    if (this.splashElement) {
      setTimeout(() =>
        this.destroy(this.splashElement)
          .then(() => this.splashElement = null));
    }
  }

  private destroy(splashElement: Element): Promise<void> {
    return new Promise<void>(resolve => {
      this.renderer.addClass(splashElement, 'stopped');
      const unregisterFn = this.renderer.listen(splashElement, 'webkitTransitionEnd', () => {
        this.renderer.removeChild(splashElement.parentElement, splashElement);
        unregisterFn();
        resolve();
      });
    });
  }

}
