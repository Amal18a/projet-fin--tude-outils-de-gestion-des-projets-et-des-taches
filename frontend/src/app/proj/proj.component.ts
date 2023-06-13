import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetserviceService } from '../projetservice.service';

@Component({
  selector: 'app-proj',
  templateUrl: './proj.component.html',
  styleUrls: ['./proj.component.css']
})
export class ProjComponent {
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
