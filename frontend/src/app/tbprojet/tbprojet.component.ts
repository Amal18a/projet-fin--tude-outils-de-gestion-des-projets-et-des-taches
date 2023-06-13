import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetserviceService } from '../projetservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tbprojet',
  templateUrl: './tbprojet.component.html',
  styleUrls: ['./tbprojet.component.css']
})
export class TbprojetComponent implements OnInit {
  nbreSprints: number = 0;
  nbreMembres: number = 0;
  nbreTaches: number = 0;
  chartDataSprints: any[] = [];
  chartDataTaches: any[] = [];
  explodeSlices = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  view: [number, number] = [500, 300];
  membresTaches: any[] = [];
  chartData: any[] = [];
  
  pourcentageTermines: number = 0;
  pourcentageTermines1: number = 0;
 
  doughnut = false; // Utiliser un graphique en forme de donut
  gradient = false; // Appliquer un dégradé de couleurs
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }; // Couleurs du graphique

  constructor(
    private route: ActivatedRoute,
    private projetservice: ProjetserviceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const projetId: string | null = params.get('_id');
      if (projetId) {
        this.projetservice.getNombreSprints(projetId).subscribe(
          nbreSprints => {
            this.nbreSprints = nbreSprints;
          },
          error => console.error(error)
        );

        this.projetservice.getNombreMembres(projetId).subscribe(
          nbreMembres => {
            this.nbreMembres = nbreMembres;
          },
          error => console.error(error)
        );

        this.projetservice.getNombreTaches(projetId).subscribe(
          nbreTaches => {
            this.nbreTaches = nbreTaches;
          },
          error => console.error(error)
        );

        this.http.get<any>(`http://localhost:3000/biProj/nombre-sprints/${projetId}`).subscribe((data: any) => {
          this.chartDataSprints = [
            { name: 'Terminés', value: data.termines },
            { name: 'À faire', value: data.aFaire },
            { name: 'En cours', value: data.enCours },
            { name: 'En retard', value: data.enRetard }
          ];
        });

        this.http.get<any>(`http://localhost:3000/biProj/nombre-taches/${projetId}`).subscribe((data: any) => {
          this.chartDataTaches = [
            { name: 'Terminés', value: data.termines },
            { name: 'À faire', value: data.aFaire },
            { name: 'En cours', value: data.enCours },
            { name: 'En retard', value: data.enRetard }
          ];
        });
        this.http.get<any[]>(`http://localhost:3000/biProj/membres/${projetId}`).subscribe(
          (response) => {
            this.chartData = response.map((item) => ({
              name: `${item.nom} ${item.prenom}`,
              value: item.count,
            }));
          },
          (error) => {
            console.error(error);
          }
        );
       

        this.http.get<any[]>(`http://localhost:3000/biProj/pourcentageTermin/${projetId}`).subscribe(
          (response: any) => {
            this.pourcentageTermines = parseFloat(response.pourcentageTerminés.toFixed(2));
          },
          (error: any) => {
            console.error(error);
          }
        );
        this.http.get<any[]>(`http://localhost:3000/biProj/pourcentage-termine/${projetId}`).subscribe(
          (response: any) => {
            this.pourcentageTermines1 = parseFloat(response.pourcentageTerminé.toFixed(2));
          },
          (error: any) => {
            console.error(error);
          }
        );
       
    
      }
    });
  }
}
