import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { PhotoComponent } from './photo/photo.component';
import {matchAlbum} from './albums-url.matcher';
import {AlbumsResolver} from './albums.resolver';


const appRoutes: Routes = [
  { matcher: matchAlbum, component: AlbumComponent, resolve: { albums: AlbumsResolver } }
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
  providers: [AlbumsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
