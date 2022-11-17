import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({ selector: 'gallery-component', template: '' })
export class GalleryComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute) {
        const pathname = router.parseUrl(router.url).toString();
        window.location.replace(environment.galleryBaseUrl + pathname);
     }

    ngOnInit() { }
}