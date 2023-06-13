import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {
  utils: any[] = [];
  nom: string = '';
  util: any[] = [];
  utilFiltres: any[] = [];
resultatsTrouves: boolean = true;
  prenom: any;
  pageSize = 5; // nombre d'éléments à afficher par page
  p = 1; // page actuelle
  

 
  constructor(private utilService: UtilService , private http: HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.utilService.getAll().subscribe(
      (data) => {
        this.utils = data;
      },
      (error) => {
        console.log(error);
      }
    ); 
  }
  refreshUtil(){
    this.utilService.getAll().subscribe(
      (data) => {
        this.utils = data;
      });
  }


  deleteUtil(cin: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      this.utilService.deleteUtil(cin).subscribe(() => {
        // remove deleted util from local array
        this.utils = this.utils.filter(utilisateur => utilisateur.cin !== cin);
        // refresh the utils list
        this.router.navigate(['/util']);
      });
    } else {
      // refresh the utils list anyway
       this.router.navigate(['/util']);  }
  }

  logCin(cin: string) {
    console.log("CIN sélectionné:", cin);
  }
  rechercher() {
    this.http.get<any[]>(`http://127.0.0.1:3000/util/rechercher?prenom=${this.prenom}`)
      .subscribe(
        (data) => {
          console.log(data);
          this.utilFiltres = data;
          this.resultatsTrouves = (data && data.length > 0);
        },
        (error) => {
          console.log(error);
          this.resultatsTrouves = false;
        }
      );
  }
  
  
}

 


 

  


  