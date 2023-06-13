import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
utilid:any;
util:any;
  constructor(private act:ActivatedRoute ,private router:Router,  private _auth:AuthService) { }

  ngOnInit(): void {
    this.utilid=this.act.snapshot.paramMap.get('utilid');
    this._auth.getbyId(this.utilid)
    .subscribe(
      res=>{
        this.util=res;
        console.log(this.util);
      }
    )
  }


}
