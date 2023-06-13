

  import { Component } from '@angular/core';
  import { UtilService } from '../util.service';
  import { ActivatedRoute } from '@angular/router';
  @Component({
    selector: 'app-consulterutil',
    templateUrl: './consulterutil.component.html',
    styleUrls: ['./consulterutil.component.css']
  })
  export class ConsulterutilComponent {
    utilid:any;
    util:any;
    constructor(private route: ActivatedRoute , private utilService: UtilService) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const cin = params['cin'];
      
        this.utilService.getByCin(cin).subscribe((data) => {
          this.util = data;
          console.log(this.util)
        });
      });
    }
  
  }