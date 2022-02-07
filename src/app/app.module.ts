import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './flat-modules/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/firestore';

import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';

import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ],
  providers: [
    {provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099]: undefined },
    {provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080]: undefined},
    //{provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5000]: undefined}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
