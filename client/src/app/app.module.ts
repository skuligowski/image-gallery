import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { AlbumComponent } from './album/album.component';
import { PhotoComponent } from './photo/photo.component';
import {matchAlbum} from "./AlbumUrlMatcher";


const appRoutes: Routes = [
  { matcher: matchAlbum, component: AlbumComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    PhotoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
