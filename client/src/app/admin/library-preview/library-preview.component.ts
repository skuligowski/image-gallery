import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import LibraryFile = Definitions.LibraryFile;

@Component({
    selector: 'app-library-preview',
    templateUrl: 'library-preview.component.html',
    styleUrls: ['library-preview.component.scss']
})

export class LibraryPreviewComponent<T> implements OnInit {
    
    @Input()
    current: T;
    
    @Input()
    set files(files: T[]) {
        this._files = files || [];
    }
    get files(): T[] {
        return this._files;
    }
    _files: T[];

    @Input()
    utilizedUrlsMap: {[key: string]: boolean} = {};
    isUrlUtilized(url: string): boolean {
      return this.utilizedUrlsMap[url];
    }
  

    @Input()
    set selected(selected: T[]) {
        this._selected = selected || [];
    }
    get selected(): T[] {
        return this._selected;
    }
    _selected: T[];

    @Output()
    selectedChange: EventEmitter<T[]> = new EventEmitter();

    @Input()
    display: boolean;

    @Input()
    urlProperty: string;

    @Output()
    displayChange: EventEmitter<boolean> = new EventEmitter();

    constructor() { 
       
    }

    isLast(): boolean {
        return this.getIndex() === this.files.length - 1;
    }

    isFirst(): boolean {
        return this.getIndex() === 0;        
    }

    public select(): void {
        const fileIndex = this.selected.findIndex(file => file[this.urlProperty] === (this.current || {})[this.urlProperty]);
        if (fileIndex === -1) {
            this.selectedChange.emit(this.selected.concat(this.current));
        } else {
            this.selected.splice(fileIndex, 1);
            this.selectedChange.emit([].concat(this.selected));
        }
    }

    public getUrl(): any {
        const encoded = encodeURI('/library' + (this.current || {})[this.urlProperty]);
        return {
            backgroundImage: `url('${encoded}')`
        }
    }

    public isSelected() {
        return this.selected.includes(this.current);
    }

    public prev(): void {
        const idx = this.getIndex();
        if (idx > 0) {
            this.current = this.files[idx - 1];
        }
    }

    public next(): void {
        const idx = this.getIndex();
        if (this.files[idx + 1]) {
            this.current = this.files[idx + 1];
        }
    }

    private getIndex(): number {
        return this.files.findIndex(file => file[this.urlProperty] === (this.current || {})[this.urlProperty]);
    }

    ngOnInit() { 
    }
}