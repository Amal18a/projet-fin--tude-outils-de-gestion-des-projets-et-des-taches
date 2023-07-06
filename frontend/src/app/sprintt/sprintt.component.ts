import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from '../sprint.service';
@Component({
  selector: 'app-sprintt',
  templateUrl: './sprintt.component.html',
  styleUrls: ['./sprintt.component.css']
})
export class SprinttComponent {
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



  

}