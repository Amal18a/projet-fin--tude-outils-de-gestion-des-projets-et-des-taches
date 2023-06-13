import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-oublier',
  templateUrl: './oublier.component.html',
  styleUrls: ['./oublier.component.css']
})
export class OublierComponent implements OnInit {
  email!: string;
  toastr: any;
 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

onSubmit() {
  this.http.post('http://localhost:3000/util/forgot-password',{ email: this.email }).subscribe(response => {
    if (response) {
      // email sent successfully
      console.log('Email sent!');
      window.alert('mail envoyé!');
    } else {
      // email not found in database
      console.log('Email not found.');
      
  
      window.alert('adresse Email introuvable !');
    }
  }, error => {
    console.error('Error sending email:', error);
   
    window.alert('Erreur envoie mail!');
  });
}
}
 
  

