

import { Component , OnInit } from '@angular/core';
import { ProjetserviceService } from '../projetservice.service';
import { AuthService } from '../services/auth.service';
import { SprintService } from '../sprint.service';
@Component({
  selector: 'app-mes-taches',
  templateUrl: './mes-taches.component.html',
  styleUrls: ['./mes-taches.component.css']
})
export class MesTachesComponent  implements OnInit {

  projets:any;
  projectId:string='';
  membreId:string='';
  tachesEncours: any;
  tachesAfaire: any;
  tachesEnretard: any;
  tachesTerminer: any;
  selectedProject: any;

  constructor( private authservice: AuthService , private sprintservice:SprintService , private projetservice:ProjetserviceService) { }

  ngOnInit(): void {
    const userInfo = this.authservice.getRoleAndId();
    if (userInfo) {
      const role = userInfo.role;
      const id = userInfo.utilid;
      this.membreId=userInfo.utilid;


      if (role === 'membre') {

        this.projetservice.getProjetsBymembreId(id).subscribe((data) => {
          this.projets = data;
          console.log(this.projets);
        });


      }
      }

} 



selectProject(projet: any) {
  this.projectId = projet._id;
  console.log('ID du projet sélectionné :', this.projectId);
  this.getTachesEncours();
  this.getTachesAfaire();
  this.getTachesEnretard();
  this.getTachesTerminer();
}
getTachesEncours() {
  this.sprintservice.gettacheEncours(this.membreId, this.projectId).subscribe(
    (data) => {
      this.tachesEncours = data;
      console.log('encours',this.tachesEncours)
    },
    error => {
      console.error(error);
      // Gérez l'erreur ici
    }
  );
}

getTachesAfaire() {
  this.sprintservice.gettacheAfaire(this.membreId, this.projectId).subscribe(
    (data) => {
      this.tachesAfaire = data;
      console.log('a faire',this.tachesAfaire)
    },
    error => {
      console.error(error);
      // Gérez l'erreur ici
    }
  );
}

getTachesEnretard() {
  this.sprintservice.gettacheEnretard(this.membreId, this.projectId).subscribe(
    (data) => {
      this.tachesEnretard = data;
      console.log('retard',this.tachesEnretard)
    },
    error => {
      console.error(error);
      // Gérez l'erreur ici
    }
  );
}

getTachesTerminer() {
  this.sprintservice.gettacheTerminer(this.membreId, this.projectId).subscribe(
    (data) => {
      this.tachesTerminer = data;
      console.log('terminer',this.tachesTerminer)
    },
    error => {
      console.error(error);
      // Gérez l'erreur ici
    }
  );
}

edittaches(taches: any): void {
  taches.isEditing = true; // Activer le mode d'édition de l'utilisateur
}

cancelEdittache(taches: any): void {
  // Annuler les modifications et désactiver le mode d'édition de l'utilisateur
  taches.isEditing = false;
  

  

} 




updatetaches(taches: any): void {
  this.sprintservice.updatetaches(taches._id, taches).subscribe(
    (response) => {
      console.log(response);
      
      taches.isEditing = false; // Désactiver le mode d'édition de l'utilisateur
      this.getTachesEncours();
      this.getTachesAfaire();
      this.getTachesEnretard();
      this.getTachesTerminer();
    },
    (error) => {
      console.error(error);
    }
  );
}
}
