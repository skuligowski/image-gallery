import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ImagePreviewComponent } from './album/image-preview/image-preview.component';
import { matchAlbum } from './albums-url.matcher';
import { LoginComponent } from './login/login.component';
import { AlbumsGuard } from './albums.guard';
import { AlbumsService } from './albums.service';
import { IndexComponent } from './index/index.component';
import { AlbumResolver } from './album.resolver';
import { AlbumsDataService } from './albums-data.service';
import { ImageGridComponent } from './album/album-preview/image-grid/image-grid.component';
import { ImageGridItemComponent } from './album/album-preview/image-grid/image-grid-item.component';
import { AlbumPreviewComponent } from './album/album-preview/album-preview.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { matcher: matchAlbum, component: AlbumComponent, canActivate: [ AlbumsGuard ], resolve: { album: AlbumResolver } },
  { path: '', component: IndexComponent, canActivate: [ AlbumsGuard ]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ImagePreviewComponent,
    LoginComponent,
    IndexComponent,
    ImageGridComponent,
    ImageGridItemComponent,
    AlbumPreviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  providers: [ AlbumResolver, AlbumsService, AlbumsGuard, AlbumsDataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
