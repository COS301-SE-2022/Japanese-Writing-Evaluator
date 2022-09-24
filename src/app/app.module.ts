import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './Interceptor/loader.interceptor';
import { UploadPage } from './upload/upload.page';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ObdModalModule } from './shared/components/obd-modal/obd-modal.module';






@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    UploadPage,
    ToastComponent,
    ObdModalModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

