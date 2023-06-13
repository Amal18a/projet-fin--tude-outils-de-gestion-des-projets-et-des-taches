import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  util: any;
  cin:any;
  constructor(private router:Router, private route: ActivatedRoute, private utilService: UtilService) { }
 

  ngOnInit(): void {
    this.cin=this.route.snapshot.paramMap.get('cin');
    this.utilService.getByCin(this.cin)
    .subscribe(
      res=>{
        this.util=res;
        console.log(this.util);
      },
      err=>{
        console.log(err);
      }
    );
  }
  onSubmit() {
    // Vérifier si l'objet utilisateur a une valeur de cin valide
    if (this.util && this.util.cin) {
      console.log('Données utilisateur:', this.util);
  
      // Créer un objet JavaScript contenant les champs de mise à jour
      let updatedUtil: {nom: string, prenom: string, email: string, role: string} = {nom: "", prenom: "", email: "", role: ""};

      
      if (this.util.nom) {
        updatedUtil.nom = this.util.nom;
      }
  
      if (this.util.prenom) {
        updatedUtil.prenom = this.util.prenom;
      }
  
      if (this.util.email) {
        updatedUtil.email = this.util.email;
      }
  
      if (this.util.role) {
        updatedUtil.role = this.util.role;
      }
  
      // Envoyer l'objet mis à jour au service
      this.utilService.updateUtil(this.util.cin , updatedUtil).subscribe((data) => {
        console.log('Les informations sont mises à jour!',data);
  
        window.alert('Les informations sont mises à jour!');
        this.router.navigate(['/util']);
      });
    } else {
      console.log('Les données utilisateur sont invalides.');
      window.alert('Les données utilisateur sont invalides!');
    }
  }
  
  
  }
  