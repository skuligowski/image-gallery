import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
    selector: 'app-anchor',
    template: '',
    styleUrls: ['anchor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent {

    @Input()
    name: string;

    constructor(private el: ElementRef<HTMLElement>) { }

    scrollIntoView(): void {
        this.el.nativeElement.scrollIntoView();
    }
}