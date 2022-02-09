import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: 'progress.component.html',
    styleUrls: ['progress.component.scss'],
})

export class ProgressComponent implements OnInit {
    constructor() { }

    public display: boolean = false;

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