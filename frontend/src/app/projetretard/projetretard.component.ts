import { Component } from '@angular/core';
import { ProjetserviceService } from '../projetservice.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-projetretard',
  templateUrl: './projetretard.component.html',
  styleUrls: ['./projetretard.component.css']
})
export class ProjetretardComponent {
  projets:any;
  pageSize = 8; // nombre d'éléments à afficher par page
  p = 1;

  constructor(
    public _auth: AuthService,
    private projetservice: ProjetserviceService,
  ) {}
  ngOnInit() {
    const userinfo=this._auth.getRoleAndId();
    if (userinfo) {
      
      const _id = userinfo.utilid;
      console.log('id',_id)
      this.projetservice.getProjetsRetard(_id).subscribe((data:any)=>{
        this.projets=data
        console.log('projets',this.projets)

      })
  }

}
getComplexityClass(complexite: string): string {
  switch (complexite.toLowerCase()) {
    case 'élevée':
      return 'complexite-elevee';
    case 'moyenne':
      return 'complexite-moyenne';
    case 'faible':
      return 'complexite-faible';
    default:
      return 'default';
  }
}

getStatusClass(statut: string): string {
  switch (statut.toLowerCase()) {

    default:
      return 'default';
  }
}
}