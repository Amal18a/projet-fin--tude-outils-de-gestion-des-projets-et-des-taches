import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import {FullCalendarModule } from '@fullcalendar/angular';



import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';





import { NgxPaginationModule } from 'ngx-pagination';
import { AcceuilComponent } from './acceuil/acceuil.component';


import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ConnexionComponent } from './connexion/connexion.component';

import { OublierComponent } from './oublier/oublier.component';
import { HeaderComponent } from './header/header.component';
import { ChangermdComponent } from './changermd/changermd.component';
import { UtilComponent } from './util/util.component';

import { ProfilComponent } from './profil/profil.component';

import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { MdfprofComponent } from './mdfprof/mdfprof.component';
import { ConsulterutilComponent } from './consulterutil/consulterutil.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ProjetComponent } from './projet/projet.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddprojComponent } from './addproj/addproj.component';
import { MdpComponent } from './mdp/mdp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjComponent } from './proj/proj.component';
import { ApercuComponent } from './apercu/apercu.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintComponent } from './sprint/sprint.component';

import { MembresComponent } from './membres/membres.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MesTachesComponent } from './mes-taches/mes-taches.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TbprojetComponent } from './tbprojet/tbprojet.component';
import { ProjetretardComponent } from './projetretard/projetretard.component';
import { CalendrierComponent } from './calendrier/calendrier.component';

import { ProjjComponent } from './projj/projj.component';
import { ApercuuComponent } from './apercuu/apercuu.component';
import { BackloggComponent } from './backlogg/backlogg.component';
import { SprinttComponent } from './sprintt/sprintt.component';
import { MembressComponent } from './membress/membress.component';






@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
  
   
    
    ConnexionComponent,
    
    OublierComponent,
    HeaderComponent,
    ChangermdComponent,
    UtilComponent,
   
    ProfilComponent,
        AddComponent,
        UpdateComponent,
        MdfprofComponent,
        ConsulterutilComponent,
        SidebarComponent,
      
        ProjetComponent,
        AddprojComponent,
        MdpComponent,
        ProjComponent,
        ApercuComponent,
        BacklogComponent,
        SprintComponent,
        
        MembresComponent,
        DashbordComponent,
        MesTachesComponent,
       
        TbprojetComponent,
        ProjetretardComponent,
        CalendrierComponent,
        
        ProjjComponent,
        ApercuuComponent,
        BackloggComponent,
        SprinttComponent,
        MembressComponent,
  
       
        
       
        
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  
    AngularEditorModule,
     BrowserAnimationsModule,
     MatButtonModule,
     MatIconModule,
     MatSidenavModule,
     MatToolbarModule,
     MatDividerModule,
     MatTabsModule,
     NgxPaginationModule,
     MatDialogModule,
     MatCardModule,
     MatListModule,
     NgxChartsModule,
     FullCalendarModule,
     MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
     

   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

