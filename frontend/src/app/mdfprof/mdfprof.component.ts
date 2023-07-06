import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mdfprof',
  templateUrl: './mdfprof.component.html',
  styleUrls: ['./mdfprof.component.css']
})
export class MdfprofComponent implements OnInit {
  utilid: any;
  util: any;
  image: any;

  constructor(private act:ActivatedRoute, private router:Router, private _auth:AuthService) { }

  ngOnInit(): void {
    this.utilid = this.act.snapshot.paramMap.get('utilid');
    this._auth.getbyId(this.utilid).subscribe(
      res => {
        this.util = res;
        console.log(this.util);
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  onSubmit() {
    // Vérifier si l'objet utilisateur a une valeur d'id valide
    if (this.util && this.util._id) {
      console.log('Données utilisateur:', this.util);

      const formData = new FormData();

      if (this.util.nom) {
        formData.append('nom', this.util.nom);
      }

      if (this.util.prenom) {
        formData.append('prenom', this.util.prenom);
      }
      if (this.image) {
        formData.append('image', this.image);
      }

      this._auth.updateProfile(this.util._id, formData).subscribe((data) => {
        console.log('Les informations sont mises à jour!', data);

        window.alert('Les informations sont mises à jour!');
        if (this.utilid) {
          this.router.navigate(['/profil', this.utilid]);
        }
      });
    } else {
      console.log('Les données utilisateur sont invalides.');

      window.alert('Les données utilisateur sont invalides.');
    }
  }
}

