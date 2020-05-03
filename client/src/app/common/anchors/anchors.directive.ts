import { Directive, Input, AfterViewInit, ViewChildren, QueryList, ElementRef, ContentChildren, OnDestroy } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnchorComponent } from './anchor.component';

@Directive({ selector: '[appAnchors]' })
export class AnchorsDirective implements AfterViewInit, OnDestroy {

    @ContentChildren(AnchorComponent, {descendants: true})
    anchors: QueryList<AnchorComponent>;

    private sub: Subscription = Subscription.EMPTY;
    private anchorsMap: { [key: string]: AnchorComponent } = {};
    constructor(private el: ElementRef<HTMLElement>) {}
    
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.sub = this.anchors.changes
            .pipe(map((queryList: QueryList<AnchorComponent>) => 
            queryList.reduce((map, el) => {
                map[el.name] = el;
                return map;
            }, {})), tap(map => {
                this.anchorsMap = map;
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