
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogService } from '../backlog.service';

@Component({
  selector: 'app-backlogg',
  templateUrl: './backlogg.component.html',
  styleUrls: ['./backlogg.component.css']
})
export class BackloggComponent {
  userstory: any;
  projectId: string = '';
  showAddForm: boolean = false;
  userStory: any = {};
  pageSize = 7; // nombre d'éléments à afficher par page
  p = 1; // page actuelle
  constructor(private route: ActivatedRoute, private backlogservice: BacklogService) { }

  ngOnInit(): void {

      this.route.params.subscribe(params => {
        const id = params['_id'];
        this.projectId = params['_id'];

        this.backlogservice.getBacklogs(id).subscribe((data) => {
          this.userstory = data;
          console.log(this.userstory);
        });
      });
    }

}