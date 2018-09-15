import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlbumSelectorModalComponent } from './common/album-selector/album-selector-modal.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AlbumsResolver } from './albums.resolver';
import { matchAlbum } from './albums-url.matcher';
import { AlbumComponent } from './album/album.component';
import { AlbumResolver } from './album.resolver';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'album/select',
    component: AlbumSelectorModalComponent,
    canActivate: [ AuthGuard ],
    resolve: { albums: AlbumsResolver },
    outlet: 'modal'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  { matcher: matchAlbum, component: AlbumComponent, canActivate: [ AuthGuard ], resolve: { album: AlbumResolver } },
  { path: '', component: IndexComponent, canActivate: [ AuthGuard ], resolve: { albums: AlbumsResolver }},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
