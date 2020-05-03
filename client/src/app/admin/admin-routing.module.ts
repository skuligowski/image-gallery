import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsManagerComponent } from './albums-manager/albums-manager.component';
import { AlbumsResolver } from '../albums.resolver';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumDetailsResolver } from './album-details.resolver';
import { LibraryUploadComponent } from './library-manager/library-upload/library-upload.component';
import { AdminGuard } from '../core/auth/admin.guard';
import { LibraryManagerComponent } from './library-manager/library-manager.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  { path: '', 
    component: AdminComponent,
    children: [
      { path: 'albums', component: AlbumsManagerComponent, resolve: { albums: AlbumsResolver }, runGuardsAndResolvers: 'always' },
      { path: 'albums/:id', component: AlbumDetailsComponent, resolve: { albums: AlbumsResolver, album: AlbumDetailsResolver }, runGuardsAndResolvers: 'always' },
      { path: 'library', component: LibraryManagerComponent },
      { path: 'library/upload', component: LibraryUploadComponent },
      { path: 'users', component: UsersManagerComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: 'albums'}
    ], canActivate: [ AdminGuard ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
