import { Component } from '@angular/core';
import { ProjetserviceService } from '../projetservice.service';

@Component({
  selector: 'app-addproj',
  templateUrl: './addproj.component.html',
  styleUrls: ['./addproj.component.css']
})
export class AddprojComponent {
  nom: string='';
  description: string='';
  membres: any[] = [];
  date_debut: Date=new Date();
  date_fin: Date = new Date();
  selectedMembres: string[]=[];
  complexite: string='';
  constructor(private projetservice:ProjetserviceService  ) {}




  ngOnInit(): void {
    this.projetservice.getMembres().subscribe(
      (membres) => {
        this.membres = membres;
        console.log(membres);
      },
      (error) => {
        console.error('Erreur lors de la récupération des membres', error);
      }
    );
  }


 





onSubmit() {
  const membresSelectionnes = this.membres.filter(membre => membre.selected).map(membre => membre._id);
  this.projetservice.addProjet(this.nom, this.description, membresSelectionnes, this.date_debut, this.date_fin, this.complexite)
    .subscribe(
      (projet) => {
        console.log('Projet ajouté avec succès', projet);
        alert('Projet ajouté avec succès');
        // rediriger l'utilisateur vers la page du projet
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
}
}