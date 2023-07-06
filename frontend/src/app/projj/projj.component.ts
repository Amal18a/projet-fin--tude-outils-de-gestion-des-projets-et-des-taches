
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetserviceService } from '../projetservice.service';

@Component({
  selector: 'app-projj',
  templateUrl: './projj.component.html',
  styleUrls: ['./projj.component.css']
})
export class ProjjComponent {
  projet:any;
  afficherCodeHTML = false;

  pourcentageTermines: number=0;
  constructor(private http: HttpClient,private route: ActivatedRoute , private projetservice: ProjetserviceService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['_id'];
    
      this.projetservice.getByid(id).subscribe((data) => {
        this.projet = data;
        console.log(this.projet)
      });
    });
   this.getPourcentageTermines();
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
  getPourcentageTermines() {
    const projetId = this.route.snapshot.paramMap.get('_id');
  
    this.http.get<any[]>(`http://localhost:3000/biProj/pourcentage-termine/${projetId}`).subscribe(
      (response: any) => {
        this.pourcentageTermines = parseFloat(response.pourcentageTerminé.toFixed(2));
      },
      (error: any) => {
        console.error(error);
      }
    );
  
}
}
