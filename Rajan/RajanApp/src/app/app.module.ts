import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from '../app/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from '../app/auth/auth-interceptor.service';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import {AngularFireModule} from '@angular/fire/compat'
import {MatSnackBarModule} from '@angular/material/snack-bar'; 


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProcesComponent } from './proces/proces.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { ReferenceComponent } from './reference/reference.component';
import { GalerijaComponent } from './galerija/galerija.component';
import { FooterComponent } from './footer/footer.component';
import { AddComponent } from './add/add.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AddPicComponent } from './add-pic/add-pic.component';
import { AddLiComponent } from './add-li/add-li.component';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    AboutComponent,
    routingComponents,
    ProcesComponent,
    PonudaComponent,
    ReferenceComponent,
    GalerijaComponent,
    AuthComponent,
    FooterComponent,
    AddComponent,
    PocetnaComponent,
    AddPicComponent,
    AddLiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule,
    MatSnackBarModule
    
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
