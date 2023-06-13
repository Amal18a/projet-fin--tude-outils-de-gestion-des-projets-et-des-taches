import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  util1={
    email:"",
    mot_de_passe:''
  }
  
  constructor(private _auth:AuthService ,private router:Router) { }

  ngOnInit(): void {
  }

  token:any;

  connexion(){
    if(!this.util1.email || !this.util1.mot_de_passe) {
      
      window.alert('Les champs email et mot de passe sont requis!');
      return;
    }

    this._auth.connexion(this.util1)
    .subscribe(
      res=>{
        this.token=res;
        localStorage.setItem('token', this.token.mytoken)
        this.router.navigate(['/dashbord']);
        window.alert('Bienvenue');
      },
      err=>{
        if (err.status === 401) {
          
          window.alert('Mot de passe incorrect!');
        } else if (err.status === 404) {
          window.alert('Adresse introuvable!');
        } else {
          console.error(err);
          window.alert('Une erreur est survenue!');
        }
      }
    );
  }
}
