import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
 import { Router, RouterModule, Routes } from '@angular/router';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAdmin: boolean = false;
  isChef: boolean = false;
  isMembre: boolean = false;

  constructor(public _auth:AuthService , private router:Router  ) { }

  ngOnInit(): void {
    
    const role = this._auth.getRole();

    if (role === 'admin') {
      this.isAdmin = true;
    } else if (role === 'chef') {
      this.isChef = true;
    } else if (role === 'membre') {
      this.isMembre = true;
    }
  }
  
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/acceuil']);
}



}







 



