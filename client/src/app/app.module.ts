import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ImagePreviewComponent } from './album/image-preview/image-preview.component';
import { matchAlbum } from './albums-url.matcher';
import { LoginComponent } from './login/login.component';
import { AlbumsService } from './albums.service';
import { IndexComponent } from './index/index.component';
import { AlbumResolver } from './album.resolver';
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
import { AuthService } from './core/auth/auth.service';
import { LibraryUploadComponent } from './admin/library-upload/library-upload.component';
import { AdminGuard } from './core/auth/admin.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { AlbumsManagerComponent } from './admin/albums-manager/albums-manager.component';
import { TableModule } from 'primeng/table';
import { AlbumDetailsComponent } from './admin/album-details/album-details.component';
import { AlbumDetailsResolver } from './admin/album-details.resolver';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LibraryFileSelectorComponent } from './admin/library-file-selector/library-file-selector.component';
import { LibraryService } from './admin/services/library.service';
import {
  AutoCompleteModule,
  ConfirmationService,
  ConfirmDialogModule,
  ContextMenuModule,
  DropdownModule,
  TreeModule
} from 'primeng/primeng';
import { AlbumCreateComponent } from './admin/album-create/album-create.component';
import { AlbumGroupSelectorComponent } from './admin/album-group-selector/album-group-selector.component';
import { EnterDirective } from './common/utils/enter.directive';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', children: [
      { path: 'albums', component: AlbumsManagerComponent, resolve: { albums: AlbumsResolver }, runGuardsAndResolvers: 'always' },
      { path: 'albums/:id', component: AlbumDetailsComponent, resolve: { album: AlbumDetailsResolver }, runGuardsAndResolvers: 'always' },
      { path: 'library/upload', component: LibraryUploadComponent },
      { path: '**', redirectTo: 'albums'}
    ], canActivate: [ AdminGuard ]},
  {
    path: 'album/select',
    component: AlbumSelectorModalComponent,
    canActivate: [ AuthGuard ],
    resolve: { albums: AlbumsResolver },
    outlet: 'modal'
  },
  { matcher: matchAlbum, component: AlbumComponent, canActivate: [ AuthGuard ], resolve: { album: AlbumResolver } },
  { path: '', component: IndexComponent, canActivate: [ AuthGuard ], resolve: { albums: AlbumsResolver }},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    LibraryUploadComponent,
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

    AlbumsManagerComponent,
    AlbumCreateComponent,
    AlbumGroupSelectorComponent,
    AlbumDetailsComponent,
    EnterDirective,
    LibraryFileSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    TreeModule,
    ContextMenuModule,
    AutoCompleteModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: false })
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    AlbumsResolver,
    AlbumResolver,
    AlbumDetailsResolver,
    AlbumsService,
    ConfirmationService,
    LibraryService,
    AlbumSelectorService,
    AuthService,
    SplashService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
