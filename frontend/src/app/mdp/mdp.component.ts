
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