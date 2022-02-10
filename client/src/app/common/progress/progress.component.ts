import { Component, Input, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { throttle } from 'rxjs/operators';

@Component({
    selector: 'app-progress',
    templateUrl: 'progress.component.html',
    styleUrls: ['progress.component.scss'],
})

export class ProgressComponent implements OnInit {
    constructor() { 

        this.ticksSubject
            .pipe(throttle(val => interval(1500)))
            .subscribe(val => {
                this.progress = Math.round(this.value / this.size * 100);
            })
    }

    public display: boolean = false;
    private ticksSubject: Subject<number> = new Subject();

    @Input()
    header: string;

    value: number = 0;
    size: number = 0;
    progress: number = 0;
    description: string = '';

    open(size: number): void {
        this.value = 0;
        this.size = size;
        this.progress = Math.round(this.value / this.size * 100);
        this.description = '';
        this.display = true;
        
    }

    tick(description?: string): void {
        this.value = this.value + 1;
        this.ticksSubject.next(this.value);
        if (this.value === this.size)
            this.progress = Math.round(this.value / this.size * 100);
        if (description) {
            this.description = description;
        }
    }
    
    setDescription(description: string): void {
        this.description = description;
    }

    close(): void {
        this.display = false;
    }

    ngOnInit() { }
}