import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcceuilComponent} from './acceuil/acceuil.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

import { ChangermdComponent } from './changermd/changermd.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HeaderComponent } from './header/header.component';

import {OublierComponent } from './oublier/oublier.component';
import { ProfilComponent } from './profil/profil.component';
import { UtilComponent} from './util/util.component';
import { MdfprofComponent } from './mdfprof/mdfprof.component';
import { ConsulterutilComponent } from './consulterutil/consulterutil.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ProjetComponent } from './projet/projet.component';
import { AddprojComponent } from './addproj/addproj.component';
import { MdpComponent } from './mdp/mdp.component';
import { ProjComponent } from './proj/proj.component';
import { MembresComponent } from './membres/membres.component';
import { ApercuComponent } from './apercu/apercu.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintComponent } from './sprint/sprint.component';

import { DashbordComponent } from './dashbord/dashbord.component';
import { MesTachesComponent } from './mes-taches/mes-taches.component';

import { TbprojetComponent } from './tbprojet/tbprojet.component';
import { ProjetretardComponent } from './projetretard/projetretard.component';
import { CalendrierComponent } from './calendrier/calendrier.component';

import { ProjjComponent } from './projj/projj.component';
import { MembressComponent } from './membress/membress.component';
import { ApercuuComponent } from './apercuu/apercuu.component';
import { BackloggComponent } from './backlogg/backlogg.component';
import { SprinttComponent } from './sprintt/sprintt.component';

const routes: Routes = [
{path :'' , component :AcceuilComponent},
{path:'acceuil' , component : AcceuilComponent},



{path:'connexion' , component : ConnexionComponent},
{path:'oublier' , component : OublierComponent},
{path:'header' , component : HeaderComponent},
{path:'changermd/:token' , component : ChangermdComponent},
{path:'util' , component : UtilComponent},
{path:'profil/:utilid' , component : ProfilComponent},
{path:'add' , component : AddComponent},
{path:'update/:cin' , component : UpdateComponent},
{path:'mdfprof/:utilid', component:MdfprofComponent },
{path :'consulterutil/:cin', component:ConsulterutilComponent},
{path:'sidebar', component:SidebarComponent },

{path:'projet', component:ProjetComponent },
{path:'addproj', component:AddprojComponent },
{path:'dashbord', component:DashbordComponent },
{path:'membre', component:MembresComponent },
{path:'mdp/:utilid', component:MdpComponent },
{path:'proj/:_id', component:ProjComponent },
{path:'apercu/:_id', component:ApercuComponent },
{path:'backlog/:_id', component:BacklogComponent },
{path:'sprint', component:SprintComponent },
{path:'mes-taches', component:MesTachesComponent },

{path:'tbprojet/:_id', component:TbprojetComponent },
{path:'projetretard', component:ProjetretardComponent },
{path:'calendrier', component:CalendrierComponent },
{path:'projj/:_id', component:ProjjComponent },
{path:'apercuu/:_id', component:ApercuuComponent },
{path:'backlogg/:_id', component:BackloggComponent },
{path:'sprintt', component:SprinttComponent },
{path:'membres', component:MembressComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
