import {Component, OnInit} from '@angular/core';
import {UserService} from "../Services/User.Service";
import {User} from "../Classes/User";
import {AuthService} from "../_auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user?: User;

  userForm: FormGroup;


  constructor(private router: Router, private userService: UserService, private authService: AuthService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [this.user?.id, Validators.required],
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user?.phoneNumber],
      address: [this.user?.address],
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      id: [this.user?.id, Validators.required],
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user?.phoneNumber],
      address: [this.user?.address],
    });
  }

  getInfo() {
    this.userService.getInfoUser().subscribe(user => {
      this.user = user
      this.initForm()
    })
  }

  ngOnInit(): void {
    this.getInfo()

  }

  desactivate() {
    this.userService.disableUser(this.user?.id ?? 0).subscribe(data => {
      this.authService.logout();
      this.router.navigate(['/home']);
    })
  }

  updateProfile() {
    // Handle saving profile logic here
    console.log(this.userForm?.value);
    if (this.userForm.valid)
      this.userService.updateProfile(this.userForm.value).subscribe((data) => {
        this.router.navigate(['/user-events']);
      })
  }

}
