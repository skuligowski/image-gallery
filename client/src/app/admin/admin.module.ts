import { NgModule } from '@angular/core';
import { AlbumsManagerComponent } from './albums-manager/albums-manager.component';
import { AlbumGroupSelectorComponent } from './album-group-selector/album-group-selector.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { LibraryUploadComponent } from './library-upload/library-upload.component';
import { LibraryFilesComponent } from './library-files/library-files.component';
import { EnterDirective } from '../common/utils/enter.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmationService, ConfirmDialogModule, DialogModule, DropdownModule, TreeModule } from 'primeng/primeng';
import { AdminRoutingModule } from './admin-routing.module';
import { LibraryService } from './services/library.service';
import { AlbumDetailsResolver } from './album-details.resolver';
import { AdminGuard } from '../core/auth/admin.guard';
import { CommonModule } from '@angular/common';
import { LibraryBrowserComponent } from './library-browser/library-browser.component';
import { LibraryDirectoryCreateComponent } from './library-directory-create/library-directory-create.component';
import { SizePipe } from '../common/utils/size.pipe';


@NgModule({
  declarations: [
    AlbumsManagerComponent,
    AlbumCreateComponent,
    AlbumGroupSelectorComponent,
    AlbumDetailsComponent,
    EnterDirective,
    LibraryDirectoryCreateComponent,
    LibraryBrowserComponent,
    LibraryFilesComponent,
    LibraryUploadComponent,

    SizePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    TreeModule,
    AdminRoutingModule
  ],
  providers: [
    AdminGuard,
    AlbumDetailsResolver,
    LibraryService,
    ConfirmationService,
  ]
})
export class AdminModule { }
