import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ImagePreviewComponent } from './album/image-preview/image-preview.component';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/auth/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AuthHttpInterceptor } from './common/utils/auth-http.interceptor';
import { ConfigGuard } from './core/config/config.guard';
import { ConfigService } from './core/config/config.service';
import { EnterModule } from './common/enter/enter.module';
import { AnchorsModule } from './common/anchors/anchors.module';

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumPreviewComponent,
    AlbumSelectorComponent,
    AlbumSelectorModalComponent,
    AppComponent,
    CurrentImagePipe,
    ImageGridComponent,
    ImageGridItemComponent,
    ImagePreviewComponent,
    IndexComponent,
    LoginComponent,
    SpinnerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EnterModule,
    FormsModule,
    HttpClientModule,
    AnchorsModule,
  ],
  providers: [
    AlbumResolver,
    AlbumSelectorService,
    AlbumsResolver,
    AlbumsService,
    AuthGuard,
    AuthService,
    ConfigGuard,
    ConfigService,
    SplashService,
    Title,
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
