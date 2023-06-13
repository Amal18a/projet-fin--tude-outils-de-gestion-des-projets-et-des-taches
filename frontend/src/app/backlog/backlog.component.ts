

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogService } from '../backlog.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {
  userstory: any;
  projectId: string = '';
  showAddForm: boolean = false;
  userStory: any = {};
  pageSize = 7; // nombre d'éléments à afficher par page
  p = 1; // page actuelle
  constructor(private route: ActivatedRoute, private backlogservice: BacklogService) { }

  ngOnInit(): void {

      this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projectId = params['_id'];

        this.backlogservice.getBacklogs(id).subscribe((data) => {
          this.userstory = data;
          console.log(this.userstory);
        });
      });
    }
  

  refreshUserStory(){
    this.backlogservice.getBacklogs(this.projectId).subscribe((data) => {
      this.userstory = data;
      console.log(this.userstory);
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addUserStory(): void {
    this.backlogservice.addUserStory(this.projectId, this.userStory).subscribe(
      (response) => {
        console.log(response);
        this.userStory = {}; // Réinitialiser les valeurs des champs de formulaire

        this.userstory.push(response); // Ajouter la nouvelle User Story à la liste

        this.showAddForm = false; // Masquer le formulaire d'ajout après l'ajout réussi
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteUserStory(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette User Story ?")) {
      this.backlogservice.deleteUserStory(id).subscribe(
        (response) => {
          console.log(response);
          this.refreshUserStory();
        },
        (error) => {
          console.error(error);
          // Gérer les erreurs de suppression de l'utilisateur
        }
      );
    }

}

editUserStory(userstory: any): void {
  userstory.isEditing = true; // Activer le mode d'édition de l'utilisateur
}

cancelEditUserStory(userstory: any): void {
  // Annuler les modifications et désactiver le mode d'édition de l'utilisateur
  userstory.isEditing = false;

  userstory.user_story = userstory.original_user_story;
  userstory.estimation = userstory.original_estimation;
  userstory.priorite = userstory.original_priorite;
}

updateUserStory(userstory: any): void {
  this.backlogservice.updateUserStory(userstory._id, userstory).subscribe(
    (response) => {
      console.log(response);
      
      userstory.isEditing = false; // Désactiver le mode d'édition de l'utilisateur
    },
    (error) => {
      console.error(error);
    }
  );
}


}