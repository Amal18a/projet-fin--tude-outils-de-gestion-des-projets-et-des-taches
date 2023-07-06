import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilService } from '../util.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  utils: any[] = [];

  utili={
    nom:'',
    prenom:'',
    email:'',
    cin:'',
    mot_de_passe:'',
    role:''
  }
  image: any;
  selectedImage(e:any){
    this.image=e.target.files[0];
  }
  constructor(private router: Router, private utilService: UtilService) { }

  ngOnInit(): void {
  }
 
  addUtil() {
    // Vérifier les champs vides
    if (!this.utili.email || !this.utili.role || !this.utili.cin || !this.utili.mot_de_passe ) {
      window.alert('Veuillez remplir tous les champs');
      return;
    }
  
    const fd = new FormData();
    fd.append('nom', this.utili.nom);
    fd.append('prenom', this.utili.prenom);
    fd.append('email', this.utili.email);
    fd.append('role', this.utili.role);
    fd.append('cin', this.utili.cin);
    fd.append('mot_de_passe', this.utili.mot_de_passe)
    fd.append('image', this.image);
  
    this.utilService.addUtil(fd)
      .subscribe(
        res => {
          this.router.navigate(['/util']);
          window.alert('Utilisateur ajouté avec succès!');
        },
        err => {
          // Afficher l'alerte appropriée selon le message d'erreur
          if (err.error === "L'adresse e-mail existe déjà") {
            window.alert("L'adresse e-mail existe déjà");
          } else if (err.error === "Le cin existe déjà") {
            window.alert('Le cin existe déjà');
          } else {
            console.log(err);
          }
        }
      );
  }
}  