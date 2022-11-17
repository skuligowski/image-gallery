import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery/gallery.component';

const appRoutes: Routes = [
  { path: '**', component: GalleryComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,  { enableTracing: false, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
