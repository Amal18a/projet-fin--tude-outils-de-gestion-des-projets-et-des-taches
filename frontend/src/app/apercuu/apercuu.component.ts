import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetserviceService } from '../projetservice.service';

@Component({
  selector: 'app-apercuu',
  templateUrl: './apercuu.component.html',
  styleUrls: ['./apercuu.component.css']
})
export class ApercuuComponent {
  projet:any;
  projets:any;
  afficherCodeHTML = false;
  projetId :string='';

  constructor(private route: ActivatedRoute , private projetservice: ProjetserviceService) { }
  ngOnInit(): void {
  
      this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projetId=params['_id'];


    
      this.projetservice.getttByid(id).subscribe((data) => {
        this.projet = data;
        console.log(this.projet)
      });
    });
  }

  } 
