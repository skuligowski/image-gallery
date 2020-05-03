import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-anchor',
    templateUrl: 'anchor.component.html',
    styleUrls: ['anchor.component.scss'],
})
export class AnchorComponent implements OnInit {

    @Input()
    name: string;

    constructor() { }

    ngOnInit() { }
}