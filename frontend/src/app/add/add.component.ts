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
      res=>{
        this.router.navigate(['/util']);
        window.alert('Utilisateur ajouté avec succès!');
      },
      err=> {
        console.log(err);
      }
    );
  }
}
