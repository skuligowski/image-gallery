import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { PhotoComponent } from './photo/photo.component';
import { matchAlbum } from './albums-url.matcher';
import { LoginComponent } from './login/login.component';
import { AlbumsGuard } from './albums.guard';
import { AlbumsService } from './albums.service';
import { IndexComponent } from './index/index.component';
import { AlbumResolver } from './album.resolver';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { matcher: matchAlbum, component: AlbumComponent, canActivate: [ AlbumsGuard ], resolve: { album: AlbumResolver } },
  { path: '**', component: IndexComponent, canActivate: [ AlbumsGuard ]}
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    PhotoComponent,
    LoginComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  providers: [ AlbumResolver, AlbumsService, AlbumsGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
