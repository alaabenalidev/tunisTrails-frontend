import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {EventModel} from "../_models/event.model";
import {EventService} from "../Services/Event.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  map: any;
  listEvents: EventModel[] = [];

  constructor(private eventService:EventService) {
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.listEvents = data
    })
  }

  ngOnInit(): void {
    this.loadEvents();
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([34.0, 9.0], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);


    //add marker on popup
    L.marker([34.0, 9.0]).addTo(this.map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  }
}

