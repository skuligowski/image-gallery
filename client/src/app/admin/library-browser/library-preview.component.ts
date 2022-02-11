import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import LibraryFile = Definitions.LibraryFile;

@Component({
    selector: 'app-library-preview',
    templateUrl: 'library-preview.component.html',
    styleUrls: ['library-preview.component.scss']
})

export class LibraryPreviewComponent implements OnInit {
    
    @Input()
    current: LibraryFile;
    
    @Input()
    set files(files: LibraryFile[]) {
        this._files = (files || []).filter(file => !file.dir)
    }
    get files(): LibraryFile[] {
        return this._files;
    }
    _files: LibraryFile[];

    @Input()
    selected: LibraryFile[];

    @Output()
    selectedChange: EventEmitter<LibraryFile[]> = new EventEmitter();

    @Input()
    display: boolean;

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
        const fileIndex = this.selected.findIndex(file => file.path === this.current.path);
        console.log(fileIndex);
        if (fileIndex === -1) {
            this.selectedChange.emit(this.selected.concat(this.current));
        } else {
            this.selected.splice(fileIndex, 1);
            this.selectedChange.emit([].concat(this.selected));
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
        return this.files.findIndex(file => file.filename === this.current?.filename);
    }

    ngOnInit() { 
    }
}