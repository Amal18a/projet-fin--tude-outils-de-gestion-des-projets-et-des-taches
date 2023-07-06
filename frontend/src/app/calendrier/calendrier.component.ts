import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; //visualiser les événements et les activités sur une vue mensuelle.
import timeGridPlugin from '@fullcalendar/timegrid'; //visualiser les événements et les activités sur une plage horaire spécifique.
import { AuthService } from '../services/auth.service';
import { SprintService } from '../sprint.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

  taches: any;

  constructor(public _auth: AuthService, private sprintservice: SprintService) {}

  ngOnInit(): void {
    const userInfo = this._auth.getRoleAndId();
    if (userInfo) {
      const _id = userInfo.utilid;
      console.log('eyyyyy', _id);

      this.sprintservice.gettache(_id).subscribe((data) => {
        this.taches = data;
        console.log('taches', this.taches);

        const calendarEl = document.getElementById('calendar');
        if (calendarEl) {
          const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin],
            initialView: 'dayGridMonth',
            events: this.taches.map((tache: any) => ({
              title: tache.nom,
              start: tache.date_debut,
              end: tache.date_fin,
              
            })),
            eventContent: this.renderEventContent // Utilise la fonction de rendu personnalisée
          });

          calendar.render();
        }
      });
    }
  }

  renderEventContent(eventInfo: any) {
    const eventTitle = document.createElement('div');
    eventTitle.classList.add('event-title');
    eventTitle.innerText = eventInfo.event.title;
  
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.classList.add(eventInfo.event.extendedProps.className);
  
   
  
    eventCard.appendChild(eventTitle);
  
    return { domNodes: [eventCard] };
  }
  
  
}
