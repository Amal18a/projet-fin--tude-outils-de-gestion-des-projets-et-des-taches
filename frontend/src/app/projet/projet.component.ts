import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { ProjetserviceService } from '../projetservice.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent {
  membres: any[] = [];
  projet: any[] = [];
  proj: any[] = [];
  nom: string = '';

  isChef: boolean = false;
  pageSize = 8; // nombre d'éléments à afficher par page
  p = 1;

  constructor(private utilService: UtilService , private router:Router , private projetservice:ProjetserviceService,public _auth:AuthService ) { }
 
 
  ischef() {
    const role = this._auth.getRole();
    if (role === 'chef') {
      this.isChef = true;
    } 
  }


  ngOnInit(): void {
    const userInfo = this._auth.getRoleAndId();
    if (userInfo) {
      const role = userInfo.role;
      const _id = userInfo.utilid;
  
      this.projet = []; // Réinitialisation de la variable projet
  
      if (role === 'admin') {
        this.projetservice.getAll().subscribe(
          (projets: any[]) => {
            this.projet = projets;
            console.log(projets);
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (role === 'chef') {
        this.projetservice.getProjetsByChefId(_id).subscribe(
          (projets: any[]) => {
            this.projet = projets;
            console.log(projets);
          },
          (error) => {
            console.log(error);
          }
        );
      }else if(role==='membre'){
        this.projetservice.getProjetsBymembreId(_id).subscribe(
          (projets: any[]) => {
            this.projet = projets;
            console.log(projets);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    }
    this.ischef(); 
  }
  
  

  deleteUtil(_id: string) {
    if (confirm("vous étes sur ?")) {
      this.projetservice.deleteUtil(_id).subscribe(() => {
        // remove deleted util from local array
        this.projet = this.projet.filter(projet => projet._id !== _id);
      });
    }
  }

  searchProjet(nom: string): void {
    this.projetservice.getProjetByNom(nom)
      .subscribe((projet) => {
        this.projet = Array.of(projet); // Encapsule le projet dans un tableau
      });
  }


  getStatusClass(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'en cours':
        return 'en-cours';
      case 'terminé':
        return 'termine';
      case 'à faire':
        return 'a-faire';
      default:
        return 'default';
    }
  }

  getComplexityClass(complexite: string): string {
    switch (complexite.toLowerCase()) {
      case 'élevée':
        return 'complexite-elevee';
      case 'moyenne':
        return 'complexite-moyenne';
      case 'faible':
        return 'complexite-faible';
      default:
        return 'default';
    }
  }

  
}