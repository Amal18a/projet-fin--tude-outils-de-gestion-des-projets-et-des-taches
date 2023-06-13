
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-changermd',
  templateUrl: './changermd.component.html',
  styleUrls: ['./changermd.component.css']
})
export class ChangermdComponent {

 
  password!: string;
  confirmPassword!: string;
  error!: string;
  token!: string;
  constructor(private http: HttpClient,private router:Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  resetPassword(form: { valid: any; }) {
    if (form.valid && this.password === this.confirmPassword) {
      this.http.post('http://localhost:3000/util/reset-password', { token: this.token, mot_de_passe: this.password })
        .subscribe(
          response => {
            console.log(response);
            // afficher un message de succès
            window.alert('Votre mot de passe est changé avec succes. vous pouvez se connecter maintenant');
            this.router.navigate(['/connexion']);
          },
          error => {
            console.log(error);
            this.error = error.error.message;
            window.alert('Token expiré');
            
            this.router.navigate(['/oublier']);
          }
        );
    }
  }

}
