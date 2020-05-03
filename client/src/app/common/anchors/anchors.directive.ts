import { Directive, Input, AfterViewInit, ViewChildren, QueryList, ElementRef, ContentChildren, OnDestroy } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnchorComponent } from './anchor.component';

@Directive({ selector: '[appAnchors]' })
export class AnchorsDirective implements AfterViewInit, OnDestroy {

    @ContentChildren(AnchorComponent, {descendants: true, read: ElementRef})
    anchors: QueryList<HTMLElement>;

    private sub: Subscription = Subscription.EMPTY;
    private anchorsMap: { [key: string]: HTMLElement } = {};
    constructor(private el: ElementRef<HTMLElement>) {}
    
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.sub = this.anchors.changes
            .pipe(map((queryList: QueryList<ElementRef>) => 
            queryList.reduce((map, el) => {
                map[el.nativeElement.name] = el.nativeElement;
                return map;
            }, {})), tap(x => {
                this.anchorsMap = x;
                console.log(x);
            }))
            .subscribe();
        this.anchors.notifyOnChanges();
    }

    scrollTo(id: string): void {
        const element = this.anchorsMap[id];
        if (element) {
            element.scrollIntoView();
        }
    }

    scrollToTop(): void {
        this.el.nativeElement.scrollIntoView();
    }
}