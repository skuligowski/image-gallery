import { NgModule } from '@angular/core';
import { AlbumsManagerComponent } from './albums-manager/albums-manager.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { LibraryUploadComponent } from './library-manager/library-upload/library-upload.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { ConfirmationService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
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
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './services/settings.service';
import { SettingsValidatorsService } from './settings/settings-validators.service';
import { AuthHttpInterceptor } from '../common/utils/auth-http.interceptor';
import { PropertyPresenterComponent } from './settings/property-presenter.component';
import { ThumbnailsService } from './services/thumbnails.service';
import { EnterModule } from '../common/enter/enter.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    AlbumCreateComponent,
    AlbumDetailsComponent,
    AlbumsManagerComponent,
    HeaderNavigationComponent,
    LibraryBrowserComponent,
    LibraryDirectoryCreateComponent,
    LibraryFilesSelectorComponent,
    LibraryManagerComponent,
    LibraryUploadComponent,
    PropertyPresenterComponent,
    SamePasswordDirective,
    SettingsComponent,
    SizePipe,
    UserCreateComponent,
    UsersManagerComponent,
  ],
  imports: [  
    AdminRoutingModule,
    ButtonModule,
    CalendarModule,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    EnterModule,
    FormsModule,
    HttpClientModule,
    InputSwitchModule,
    ReactiveFormsModule,
    TableModule,
    TreeModule,
  ],
  providers: [
    AdminGuard,
    AlbumDetailsResolver,
    ConfirmationService,
    LibraryService,
    SettingsService,
    SettingsValidatorsService,
    ThumbnailsService,
    UsersService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ]
})
export class AdminModule { }
