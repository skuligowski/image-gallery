import { Directive, Input, ElementRef } from '@angular/core';

@Directive({ selector: '[appAnchor]' })
export class AnchorDirective {
    @Input('appAnchor')
    public name: string;

    constructor(private el: ElementRef<HTMLElement>) { }

    scrollIntoView(): void {
        this.el.nativeElement.scrollIntoView({block: 'center', inline: 'center'});
    }
}