import { NgModule } from '@angular/core';
import { AlbumsManagerComponent } from './albums-manager/albums-manager.component';
import { AlbumGroupSelectorComponent } from './album-group-selector/album-group-selector.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { LibraryUploadComponent } from './library-manager/library-upload/library-upload.component';
import { EnterDirective } from '../common/utils/enter.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  InputSwitchModule,
  TreeModule
} from 'primeng/primeng';
import { AdminRoutingModule } from './admin-routing.module';
import { LibraryService } from './services/library.service';
import { AlbumDetailsResolver } from './album-details.resolver';
import { AdminGuard } from '../core/auth/admin.guard';
import { CommonModule } from '@angular/common';
import { LibraryBrowserComponent } from './library-browser/library-browser.component';
import { LibraryDirectoryCreateComponent } from './library-manager/library-directory-create/library-directory-create.component';
import { SizePipe } from '../common/utils/size.pipe';
import { LibraryFilesSelectorComponent } from './library-files-selector/library-files-selector.component';
import { LibraryManagerComponent } from './library-manager/library-manager.component';
import { UsersService } from './services/users.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { SamePasswordDirective } from './user-create/same-password.directive';
import { HeaderNavigationComponent } from './header-navigation.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './services/settings.service';


@NgModule({
  declarations: [
    HeaderNavigationComponent,

    AlbumsManagerComponent,
    AlbumCreateComponent,
    AlbumGroupSelectorComponent,
    AlbumDetailsComponent,
    EnterDirective,
    LibraryDirectoryCreateComponent,
    LibraryBrowserComponent,
    LibraryFilesSelectorComponent,
    LibraryUploadComponent,
    LibraryManagerComponent,
    UsersManagerComponent,
    UserCreateComponent,
    SettingsComponent,

    SizePipe,
    SamePasswordDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DropdownModule,
    TreeModule,
    AdminRoutingModule,
  ],
  providers: [
    AdminGuard,
    AlbumDetailsResolver,
    LibraryService,
    ConfirmationService,
    UsersService,
    SettingsService,
  ]
})
export class AdminModule { }
