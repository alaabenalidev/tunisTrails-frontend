import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Classes/User';
import { UserService } from '../Services/User.Service';
import { Role } from '../Classes/Role.enum';
import {AuthService} from "../_auth/auth.service";

@Component({
  selector: 'app-agency-signin',
  templateUrl: './agency-signin.component.html',
  styleUrls: ['./agency-signin.component.css']
})
export class AgencySigninComponent {
  signupForm: FormGroup;
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: Role.AGENCY, // Set role as AGENCY
    phoneNumber: '',
    address: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with FormBuilder
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['',Validators.required],
      address: ['', [Validators.required]],
    });
  }

  // Getter method to access form controls easily in the template
  get f() { return this.signupForm.controls; }

  onSubmit() {
    // Stop here if the form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    // Assign form values to user object
    this.user.name = this.f['name'].value;
    this.user.email = this.f['email'].value;
    this.user.password = this.f['password'].value;
    this.user.phoneNumber = this.f['phoneNumber'].value;
    this.user.address = this.f['address'].value;


    if(this.user.password != this.signupForm.get('confirmPassword')?.value) {
      alert("Passwords don't match");
      return;
    }
    // Call UserService to register the user
    this.authService.register(this.user).subscribe(User =>{
      this.router.navigate(['/list-utilisateur']);
    })
    // this.userService.register(this.user).subscribe(
    //   response => {
    //     // Handle successful registration (e.g., navigate to a different page)
    //     this.router.navigate(['/loginC']); // Navigate to agency dashboard
    //   },
    //   error => {
    //     // Handle error
    //     console.error(error);
    //   }
    // );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);  // Use non-null assertion operator
    }
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home']);
  }
}

