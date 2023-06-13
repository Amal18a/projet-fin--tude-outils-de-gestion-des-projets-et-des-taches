import { Component, OnInit } from '@angular/core';
import { ProjetserviceService } from '../projetservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  projet: any;
  membres: any={};
  membre: any[] = [];
  projectId: string = '';
  membreSelectionne: any;
  formulaireAjoutMembreVisible: boolean = false;


  constructor(
    private projetService: ProjetserviceService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projectId = params['_id'];

    
      this.projetService.membres(id).subscribe((data) => {
        this.membres = data;
        console.log(this.membres)
      });

      this.projetService.getMembres().subscribe(
        membres => {
          this.membre = membres;
          console.log('Liste des membres:', this.membre);
    });
  })

}

refreshmembre(){
  this.projetService.membres(this.projectId).subscribe((data) => {
    this.membres = data;
    console.log(this.membres)
  });
}

afficherFormulaireAjoutMembre() {
  this.formulaireAjoutMembreVisible = true;
}


selectionnerMembre(membre: any) {
  this.membreSelectionne = membre;
}


ajouterMembreAuProjet() {
  if (!this.membreSelectionne) {
    console.error('Aucun membre sélectionné');
    return;
  }

  const membres = [this.membreSelectionne]; // Modifier ici selon la structure de votre objet membre

  const requestBody = { membres };
  console.log(requestBody)

  this.projetService.ajouterMembreAuProjet(this.projectId, requestBody).subscribe(
    (response: any) => {
      console.log('Membre ajouté au projet avec succès', response);
      this.refreshmembre();

    },
    (error: any) => {
      console.error('Erreur lors de l\'ajout du membre au projet', error);
      // Gérer l'erreur d'ajout du membre au projet si nécessaire
    }
  );
}

supprimerMembre( membreId: string): void {
  this.projetService.supprimerMembreDuProjet(this.projectId, membreId)
    .subscribe(
      response => {
        console.log('Membre supprimé du projet avec succès');
        
        this.refreshmembre();
        this.formulaireAjoutMembreVisible = false;

      },
      error => {
        console.error('Une erreur est survenue lors de la suppression du membre du projet', error);
        // Ajoutez ici le code de gestion des erreurs ou l'affichage d'un message d'erreur à l'utilisateur
      }
    );
}



}





