import { NgModule } from '@angular/core';
import { AlbumsManagerComponent } from './albums-manager/albums-manager.component';
import { AlbumGroupSelectorComponent } from './album-group-selector/album-group-selector.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { LibraryUploadComponent } from './library-upload/library-upload.component';
import { LibraryFileSelectorComponent } from './library-file-selector/library-file-selector.component';
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
import { LibraryManagerComponent } from './library-manager/library-manager.component';
import { LibraryBrowserComponent } from './library-browser/library-browser.component';


@NgModule({
  declarations: [
    AlbumsManagerComponent,
    AlbumCreateComponent,
    AlbumGroupSelectorComponent,
    AlbumDetailsComponent,
    EnterDirective,
    LibraryBrowserComponent,
    LibraryManagerComponent,
    LibraryFileSelectorComponent,
    LibraryUploadComponent,
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
