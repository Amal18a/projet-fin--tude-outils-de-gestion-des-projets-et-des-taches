// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { UtilService } from '../util.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-mdp',
//   templateUrl: './mdp.component.html',
//   styleUrls: ['./mdp.component.css']
// })
// export class MdpComponent {
//   utilid: any;
//   util: any;
//   ancien_mot_de_passe: any;
//   nouveau_mot_de_passe: any;
//   errorMessage: any;
//   newPassword: any;
//   constructor(private act:ActivatedRoute, private router:Router, private _auth:AuthService , private http: HttpClient) { }
//   ngOnInit(): void {
//     this.utilid = this.act.snapshot.paramMap.get('utilid');
//     this._auth.getbyId(this.utilid).subscribe(
//       res => {
//         this.util = res;
//         console.log(this.util);
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   }
//   onSubmit(): void {
//     const body = { mot_de_passe: this.newPassword };
//     this.http.put(`http://localhost:3000/util/updatebyid1/${this.utilid}`, body)
//       .subscribe(
//         response => {
//           console.log(response);
//           window.alert('Mot de passe modifié avec succès');
//           this.router.navigate(['/profil', this.utilid]);
//         },
//         error => this.errorMessage = error.message
//       );
//   }

// }
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-mdp',
  templateUrl: './mdp.component.html',
  styleUrls: ['./mdp.component.css']
})
export class MdpComponent {
  newPassword: string='';
  utilid: string='';

  constructor(
    private route: ActivatedRoute,
    private utilservice: UtilService
  ) { }

  ngOnInit(): void {
    this.utilid = this.route.snapshot.params['utilid'];
    console.log('User ID:', this.utilid);
  }

  updatePassword(): void {
    this.utilservice.updatePassword1(this.utilid, this.newPassword)
      .subscribe(
        (response) => {
          console.log('Mot de passe mis à jour avec succès');
          // Gérez la réponse de réussite de la mise à jour du mot de passe ici
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du mot de passe', error);
          // Gérez les erreurs de mise à jour du mot de passe ici
        }
      );
  }
}