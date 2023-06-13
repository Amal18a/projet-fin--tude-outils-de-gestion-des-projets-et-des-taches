import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetserviceService } from '../projetservice.service';

@Component({
  selector: 'app-apercu',
  templateUrl: './apercu.component.html',
  styleUrls: ['./apercu.component.css']
})
export class ApercuComponent {
  projet:any;
  projets:any;
  afficherCodeHTML = false;
  projetId :string='';

  constructor(private route: ActivatedRoute , private projetservice: ProjetserviceService) { }
  ngOnInit(): void {
  
      this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projetId=params['_id'];


    
      this.projetservice.getttByid(id).subscribe((data) => {
        this.projet = data;
        console.log(this.projet)
      });
    });
  }
  refreshprojet(){
    this.projetservice.getttByid(this.projetId).subscribe((data) => {
      this.projet = data;
      console.log(this.projet)
    });
  }

  
  editprojet(projet: any): void {
    projet.isEditing = true; // Activer le mode d'édition de l'utilisateur
  }

  cancelEditprojet(projet: any): void {
    // Annuler les modifications et désactiver le mode d'édition de l'utilisateur
    projet.isEditing = false;
    this.refreshprojet();
  
  } 



  updateprojet(projets: any): void {
    this.projetservice.updateprojet(this.projetId, projets).subscribe(
      (response) => {
        console.log(response);
        
        projets.isEditing = false; // Désactiver le mode d'édition de l'utilisateur
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
