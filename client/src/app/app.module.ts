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
import { AlbumSelectorModalComponent } from './common/album-selector/album-selector-modal.component';
import { AlbumSelectorService } from './common/album-selector/album-selector.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumSelectorComponent } from './common/album-selector/album-selector.component';
import { AlbumsResolver } from './albums.resolver';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { SplashService } from './common/splash/splash.service';
import { CurrentImagePipe } from './album/image-preview/current-image.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'album/select',
    component: AlbumSelectorModalComponent,
    canActivate: [ AlbumsGuard ],
    resolve: { albums: AlbumsResolver },
    outlet: 'modal'
  },
  { matcher: matchAlbum, component: AlbumComponent, canActivate: [ AlbumsGuard ], resolve: { album: AlbumResolver } },
  { path: '', component: IndexComponent, canActivate: [ AlbumsGuard ], resolve: { albums: AlbumsResolver }},
  { path: '**', redirectTo: '/login'}
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
    AlbumSelectorModalComponent,
    AlbumSelectorComponent,
    SpinnerComponent,
    CurrentImagePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  providers: [
    AlbumsResolver,
    AlbumResolver,
    AlbumsService,
    AlbumsGuard,
    AlbumsDataService,
    AlbumSelectorService,
    AuthService,
    SplashService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
