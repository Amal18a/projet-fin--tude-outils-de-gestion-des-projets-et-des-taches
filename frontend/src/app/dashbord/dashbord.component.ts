import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProjetserviceService } from '../projetservice.service';
import { SprintService } from '../sprint.service';
import { ColorHelper, id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  isAdmin: boolean = false;
  isChef: boolean = false;
  isMembre: boolean = false;

  chartData: any[] = [];
  chartData1: any[] = [];
  chartData2: any[] = [];
  chartData3: any[] = [];
  chartData4: any[] = [];
  chartData5: any[] = [];
  chartData6: any[] = [];
  chartData7:any[] = [];
  chartData8:any[]=[];
  progression:any;
  nombreProjetsMembre: number | undefined;
  nombretachesMembre: number | undefined;
  maxmembre:any;
  nombreProjetsChef: number | undefined;
  prenom: string='';
  explodeSlices = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  view: [number, number] = [500, 300];
  nombreProjets: number | undefined;
  nombreUtils: number | undefined;
  nombreProjets1: number | undefined;
  chartOptions: any;
  colorSchema: { domain: string[] } | undefined;
  single: any[] = [];
  // xAxisLabel = 'Mois';
  // yAxisLabel = 'Nombre de tâches';
  showXAxisLabel = true;
  showYAxisLabel = true;
  showXAxis = true; // Ajoutez cette ligne pour déclarer la propriété showXAxis
  showYAxis = true;
  projets:any;
  constructor(
    private http: HttpClient,
    public _auth: AuthService,
    private router: Router,
    private projetservice: ProjetserviceService,
    private sprintservice:SprintService,

  ) {}

  ngOnInit() { 
     
  // utilisateur par role
    this.http.get<any>('http://localhost:3000/biAdmin/calculer-utilisateurs').subscribe((data: any) => {
      this.chartData = [
        { name: 'Membres', value: data.utilisateursMembre },
        { name: 'Chefs', value: data.utilisateursChef },
        { name: 'Admins', value: data.utilisateursAdmin }
      ];
    });
// taches par statut
    this.http.get<any>('http://localhost:3000/biAdmin/calculer-taches').subscribe((data: any) => {
      this.chartData8 = [
        { name: 'Afaire', value: data.tachesAFaire },
        { name: 'EnCours', value: data.tachesEnCours },
        { name: 'Termines', value: data.tachesTermines },
        { name: 'EnRetard', value: data.tachesEnRetard }
      ];
    });

// projet par complexite
    this.http.get<any>('http://localhost:3000/biAdmin/nombre-projets-par-complexite').subscribe((data: any) => {
      this.chartData1 = [
        { name: 'moyenne', value: data.moyenne },
        { name: 'élevée', value: data.élevée },
        { name: 'faible', value: data.faible }
      ];
    });



// role de token
    const role = this._auth.getRole();
    if (role === 'admin') {
      this.isAdmin = true;
    } else if (role === 'chef') {
      this.isChef = true;
    } else if (role === 'membre') {
      this.isMembre = true;
    }
// role et id de token
    const userinfo=this._auth.getRoleAndId();
    if (userinfo) {

      this.prenom=userinfo.prenom;
      const _id = userinfo.utilid;
  // tache d'un membre spécifique selon statut
      this.sprintservice.gettachemembresatatut(_id).subscribe((data:any)=>{
        console.log('tachesss',data)
        this.chartData2= [
          { name: 'À faire', value: data.tachesAFaire },
          { name: 'En cours', value: data.tachesEnCours },
          { name: 'Terminé', value: data.tachesTermines },
          { name: 'En retard', value: data.tachesEnRetard }
        ];
      });
// nbre de projet q'un membre spécifique appartient
      this.sprintservice.getnbreprojetmembre(_id).subscribe((data:any)=>{
        this.nombreProjetsMembre=data.nombreProjets

      });
      this.sprintservice.getnbretachetmembre(_id).subscribe((data:any)=>{
        this.nombretachesMembre=data.nombreTaches

      });
      
// taches par mois d'un membre specifique
      this.sprintservice.gettachesparmois(_id).subscribe((data: any) => {
        this.chartData3 = [
          {
            name: 'Tâches par mois',
            series: data.map((entry: { mois: number; count: any; }) => {
              return {
                name: entry.mois,
                value: entry.count
              };
            })
          }
        ];
      });
      
//bi chef
    //projets par statut
      this.projetservice.getProjeStatut(_id).subscribe((data)=>{
        console.log('hett',data)
        this.chartData4= [
          { name: 'À faire', value: data.Afaire },
          { name: 'En cours', value: data.EnCours },
          { name: 'Terminé', value: data.Termine },
          { name: 'En retard', value: data.EnRetard }
        ];
      })
     //nombre totale des projets
      this.projetservice.getnombreProjetChef(_id).subscribe((data)=>{
        this.nombreProjetsChef=data.count
        
      })
      //nombre projet par mois
      function getNomMois(numeroMois: number) {
        const nomsMois = [
          "janvier", "février", "mars", "avril", "mai", "juin",
          "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ];
      
        return nomsMois[numeroMois - 1];
      }

// projet retard d'un chef specifique
      this.projetservice.getProjetsRetard(_id).subscribe((data:any)=>{
        this.projets=data
        console.log('projets',this.projets)

      })
  
  // projet par mois d'un chef specifique  
      this.projetservice.getnombreProjetParMois(_id).subscribe((data) => {
        this.chartData5 = [
          {
            name: 'projet par mois',
            series: data.projetsParMois.map((entry: { mois: number; count: any; }) => {
              return {
                name: getNomMois(entry.mois),
                value: entry.count,
              };
            }),
          },
        ];
      });
// niveau de progression des projet d'un chef
      this.projetservice.getProgression(_id).subscribe((data)=>{
        this.progression=data

        console.log('dataaaa',this.progression)
      })
  
// meilleur membre
      this.projetservice.getMembresMax().subscribe((data)=>{
        this.maxmembre=data;
        console.log('htis',this.maxmembre)

      })

// projet total par mois
      this.projetservice.getprojetsparmois().subscribe((data)=>{
        this.chartData6=[
          {
            name: 'projet par mois',
            series: data.projetsParMois.map((entry: { mois: number; count: any; }) => {
              return {
                name: getNomMois(entry.mois),
                value: entry.count,
              };
            }),

          }
        ]


      })

// nbre de projet total
    this.projetservice.getNombreProjets().subscribe(
      data => {
        this.nombreProjets = data.nombreProjets;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de projets :', error);
      }
    );
// nbre des utilisateurs total
    this.projetservice.getNombreUtils().subscribe(
      data => {
        this.nombreUtils = data.nombreUtils;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de utilisateurs :', error);
      }
    );
  // nbre des projet en 30j
    this.projetservice.getnbreproj30j().subscribe(
      data => {
        this.nombreProjets1 = data.nombreProjets1;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de projets :', error);
      }
    );
// nbre de projet par chef
    this.projetservice.getnbreprojetparchef().subscribe((data)=>{
      this.chartData7 = data.map((item: { chef: any;nombreProjets: any; }) => ({
        name:item.chef,
        value: item.nombreProjets,
      }));

    })
 
}
}

}







 

  
