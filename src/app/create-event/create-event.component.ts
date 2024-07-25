import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from "../Services/Event.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      ville: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      maxParticipants: [1, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Optionally, you can preview the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Display image preview if needed
      // Example: this.previewImage = e.target.result;
      this.selectedFile = e.target.result;
      this.eventForm.patchValue({
        image: e.target.result
      })
    };
    // reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    this.eventForm.patchValue({
      image: this.selectedFile
    })
    if (this.eventForm.valid) {
      // Form is valid, proceed with form data
      console.log(this.eventForm.value);
      this.eventService.createEvent(this.eventForm.value).subscribe((data) => {
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

