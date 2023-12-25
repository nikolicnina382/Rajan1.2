import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { GalerijaComponent } from "./galerija/galerija.component";
import { PonudaComponent } from "./ponuda/ponuda.component";
import { ProcesComponent } from "./proces/proces.component";
import { ReferenceComponent } from "./reference/reference.component";
import { AddComponent } from "./add/add.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { PocetnaComponent } from "./pocetna/pocetna.component";
import { AddPicComponent } from "./add-pic/add-pic.component";
import { AddLiComponent } from "./add-li/add-li.component";


const routes: Routes = [

    {
      path: 'add',
      component: AddComponent,
      canActivate: [AuthGuard]
      
    },
    {
      path: 'addPic',
      component: AddPicComponent,
      canActivate: [AuthGuard]
      
    }, {
      path: 'addLi',
      component: AddLiComponent,
      canActivate: [AuthGuard]
      
    },

    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'galerija', component: GalerijaComponent },
    { path: 'ponuda', component: PonudaComponent },
    { path: 'proces', component: ProcesComponent },
    { path: 'reference', component: ReferenceComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'pocetna', component: PocetnaComponent },
    {path: '**', component: PocetnaComponent }
    ];
    
  
  @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    export const routingComponents = [ContactComponent,AboutComponent, GalerijaComponent, PonudaComponent, ProcesComponent,ReferenceComponent  ]
    