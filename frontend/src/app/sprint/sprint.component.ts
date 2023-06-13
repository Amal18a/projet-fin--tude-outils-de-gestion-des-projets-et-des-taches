
      

    
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from '../sprint.service';
@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent {
  sprints:any;
  projectId: string = '';
  Sprints: any = {};
  showSprintForm: boolean = false;
  selectedSprintId: string='';
  taches:any;
  Taches:any={};
  showtacheForm: boolean=false;
  idsprint:string='';
  membres:any;


  constructor(private route: ActivatedRoute , private sprintservice:SprintService ){}
  ngOnInit(): void {
 
     this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projectId = params['_id'];

        this.sprintservice.getsprints(id).subscribe((data) => {
          this.sprints = data;
          console.log(this.sprints)
        });

        this.sprintservice.getmembres(id).subscribe((data) => {
          this.membres = data;
          console.log(this.membres)
        });
      });
    
  }

  refreshsprints(){
    this.sprintservice.getsprints(this.projectId).subscribe((data) => {
      this.sprints = data;
      console.log(this.sprints);
    });
  }



  toggleSprintForm() {
    this.showSprintForm = !this.showSprintForm;
  }
  toggletacheForm() {
    this.showtacheForm = !this.showtacheForm;
  }

  addsprints(): void {
    this.sprintservice.addSprints(this.projectId, this.Sprints).subscribe(
      (response) => {
        console.log(response);
        this.Sprints = {}; // Réinitialiser les valeurs des champs de formulaire

        this.refreshsprints(); // Ajouter la nouvelle User Story à la liste

        this.showSprintForm = false; // Masquer le formulaire d'ajout après l'ajout réussi
      },
      (error) => {
        console.error(error);
        alert('Une erreur est survenue lors de la validation.');
      }
    );
  }

  
  deleteSprints(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette sprint ?")) {
      this.sprintservice.deleteSprints(id).subscribe(
        (response) => {
          console.log(response);
          this.refreshsprints();
        },
        (error) => {
          console.error(error);
          // Gérer les erreurs de suppression de l'utilisateur
        }
      );
    }

}

editSprints(sprint: any): void {
  sprint.isEditing = true; // Activer le mode d'édition de l'utilisateur
}

cancelEditSprints(sprint: any): void {
  // Annuler les modifications et désactiver le mode d'édition de l'utilisateur
  sprint.isEditing = false;
  this.refreshsprints();


} 

updatesprints(sprints: any): void {
  this.sprintservice.updatesprint(sprints._id, sprints).subscribe(
    (response) => {
      console.log(response);
      
      sprints.isEditing = false; // Désactiver le mode d'édition de l'utilisateur
    },
    (error) => {
      console.error(error);
    }
  );
}

viewSprintDetails(sprintId: string) {
  this.selectedSprintId = sprintId;
  this.idsprint = sprintId;

  if (!sprintId) {
    console.error('L\'ID du sprint est manquant');
    return;
  }

  console.log(`Affichage des détails du sprint avec l'ID : ${sprintId}`);

  // Appelez la fonction get pour les tâches en utilisant le service des tâches
  this.sprintservice.
  getTaches(sprintId.toString()).subscribe(
    (taches) => {
      // Gérez les tâches récupérées
      console.log('Tâches récupérées :', taches);
      this.taches = taches; // Mettez à jour la propriété taches avec les données récupérées
    },
    (erreur) => {
      // Gérez l'erreur
      console.error('Erreur lors de la récupération des tâches :', erreur);
      // Effectuez la gestion des erreurs ou affichez un message d'erreur à l'utilisateur
    }
  );
}


  refreshtache(){
    this.sprintservice.getTaches(this.idsprint).subscribe((data) => {
      this.taches = data;
      console.log(this.taches);
    });
  }

  addtache(): void {
    console.log(this.Taches.membre); // Afficher la valeur sélectionnée dans la console
  
    this.sprintservice.addtaches(this.idsprint, this.Taches).subscribe(
      (response) => {
        console.log(response);
        this.Taches = {}; // Réinitialiser les valeurs des champs de formulaire
        this.refreshtache();// Ajouter la nouvelle User Story à la liste
        this.showtacheForm = false; // Masquer le formulaire d'ajout après l'ajout réussi
      },
      (error) => {
        console.error(error);
        alert("il faut respecter la periode de sprint")
      }
    );
  }

  deletetache(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")) {
      this.sprintservice.deletetaches(id).subscribe(
        (response) => {
          console.log(response);
          this.refreshtache();
        },
        (error) => {
          console.error(error);
          // Gérer les erreurs de suppression de l'utilisateur
        }
      );
    }

}

edittaches(taches: any): void {
  taches.isEditing = true; // Activer le mode d'édition de l'utilisateur
}

cancelEdittache(taches: any): void {
  // Annuler les modifications et désactiver le mode d'édition de l'utilisateur
  taches.isEditing = false;
  this.refreshtache();

  

} 




updatetaches(taches: any): void {
  this.sprintservice.updatetaches(taches._id, taches).subscribe(
    (response) => {
      console.log(response);
      
      taches.isEditing = false; // Désactiver le mode d'édition de l'utilisateur
    },
    (error) => {
      console.error(error);
    }
  );
}
  

}