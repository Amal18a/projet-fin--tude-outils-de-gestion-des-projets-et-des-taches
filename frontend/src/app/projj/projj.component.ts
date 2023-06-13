
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

  constructor(private route: ActivatedRoute , private projetservice: ProjetserviceService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['_id'];
    
      this.projetservice.getByid(id).subscribe((data) => {
        this.projet = data;
        console.log(this.projet)
      });
    });
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
}
