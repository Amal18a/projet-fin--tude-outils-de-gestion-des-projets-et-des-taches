import { Component, OnInit } from '@angular/core';
import { ProjetserviceService } from '../projetservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-membress',
  templateUrl: './membress.component.html',
  styleUrls: ['./membress.component.css']
})
export class MembressComponent implements OnInit {
  projet: any;
  membres: any={};
  membre: any[] = [];
  projectId: string = '';
  membreSelectionne: any;
  formulaireAjoutMembreVisible: boolean = false;


  constructor(
    private projetService: ProjetserviceService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projectId = params['_id'];

    
      this.projetService.membres(id).subscribe((data) => {
        this.membres = data;
        console.log(this.membres)
      });

      this.projetService.getMembres().subscribe(
        membres => {
          this.membre = membres;
          console.log('Liste des membres:', this.membre);
    });
  })

}

}