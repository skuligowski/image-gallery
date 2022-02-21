import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Jimp from 'jimp/browser/lib/jimp';
import { asyncScheduler, interval, Observable, Subject, Subscription } from 'rxjs';
import Image = Definitions.Image;
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;
import ProcessingExportParams = Definitions.ProcessingExportParams;
import ProcessingAdjustParams = Definitions.ProcessingAdjustParams;
import { throttle, switchMap, debounceTime, throttleTime } from 'rxjs/operators';
import { ConsoleLogger } from '@angular/compiler-cli/private/localize';


@Component({
    selector: 'app-manual-processing',
    templateUrl: 'manual-processing.component.html',
    styleUrls: ['manual-processing.component.scss'],
})

export class ManualProcessingComponent implements OnInit {
    
    display: boolean;
    current: Image;

    worker: Worker;
    imageUrl: string;
    image: any = {};
    zoomRate: number = 0;
    loading: boolean = true;

    refreshSubject: Subject<void> = new Subject();
    refresh$: Observable<void> = this.refreshSubject.asObservable()
        .pipe(throttleTime(600, asyncScheduler, {leading: false, trailing: true}));
    refreshSubscription: Subscription = Subscription.EMPTY;

    resizeEnabled: boolean;
    resizeParams: ProcessingResizeParams = {width: 1024, height: 768, mode: 'RESIZE_BICUBIC'};
    resizeModes: any[] = [
        {code: 'RESIZE_NEAREST_NEIGHBOR', name: 'Nearest n.'},
        {code: 'RESIZE_BILINEAR', name: 'Bilinear'},
        {code: 'RESIZE_BICUBIC', name: 'Bicubic'},
        {code: 'RESIZE_HERMITE', name: 'Hermite'},
        {code: 'RESIZE_BEZIER', name: 'Bezier'},
    ];

    sharpenParams: ProcessingSharpenParams = {amount: 0.2};
    exportParams: ProcessingExportParams = {quality: 92};
    adjustParams: ProcessingAdjustParams = {exposure: 0};
    
    open(current: Image): void {
        this.display = true;
        let imageUrl = current.url;
        this.zoomRate = 0;
        this.image = {
            backgroundImage: '',
            height: this.getHeight(),
            width: this.getWidth(),
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }
        this.loading = true;

        if (current.processing) {
            if (current.processing.params.resize) {
                this.resizeParams = {...current.processing.params.resize};
                this.resizeEnabled = true;
            }
            if (current.processing.params.sharpen) {
                this.sharpenParams = {...current.processing.params.sharpen};
            }
            this.exportParams = {...current.processing.params.export};
            imageUrl = current.processing.source.url;
        }
        this.current = current;
        this.imageUrl = '/library'+imageUrl;
    
        this.refreshSubscription = this.refresh$.subscribe(() => this.refresh());
        this.nextRefresh();
    }

    nextRefresh(): void {
        this.refreshSubject.next();
    }

    refresh(): void {     
        this.worker.postMessage({
            imageUrl: this.imageUrl,
            params: {
                resize: {width: 1024, height: 768, mode: this.resizeParams?.mode || 'RESIZE_BEZIER'},
                adjust: this.adjustParams,
                sharpen: this.sharpenParams,
                export: this.exportParams,
            }
        })
    }

    zoom(): void {
        if (this.zoomRate === 0) {
            this.zoomRate = 1;
        } else if (this.zoomRate === 1) {
            this.zoomRate = 1.5
        } else if (this.zoomRate === 1.5) {
            this.zoomRate = 0;
        }
        this.image = {
            ...this.image,
            height: this.getHeight(),
            width: this.getWidth()
        }
    }
    
    close(): void {
        this.refreshSubscription.unsubscribe();
        this.display = false;
    }

    constructor() {
        this.worker = new Worker('processing.worker.js');
        this.worker.onmessage = (e) => {
            this.loading = false;
            this.image = {
                backgroundImage: `url('${e.data}')`,
                height: this.getHeight(),
                width: this.getWidth(),
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }
        }
     }

    getHeight(): string {
        if (this.zoomRate === 0) {
            return '100%';
        }
        let height;
        if (this.current.width > this.current.height) {
            height = this.current.height / this.current.width * 1024;
        } else {
            height = 768;
        }
        return (height * this.zoomRate) + 'px';
    }

    getWidth(): string {
        if (this.zoomRate === 0) {
            return '100%';
        }
        if (this.current.width > this.current.height) {
            return (this.zoomRate * 1024) +'px';
        } else {
            return 'auto';
        }
    }

    ngOnInit() { 
        
    }
}