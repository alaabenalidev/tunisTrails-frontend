import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EventService} from "../Services/Event.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;

  constructor(private fb: FormBuilder,private eventService:EventService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      maxParticipants: [1, [Validators.required,Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.eventForm.valid) {
      // Form is valid, proceed with form data
      console.log(this.eventForm.value);
      this.eventService.createEvent(this.eventForm.value).subscribe((data)=>{
        console.log(data);
        this.router.navigateByUrl("/agevents");
      })

      // Example: You can send the form data to a service for further processing
    } else {
      // Form is invalid, handle errors or display messages
      console.log("Form is invalid!");
    }
  }

}

