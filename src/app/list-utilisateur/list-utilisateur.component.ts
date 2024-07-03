import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_auth/auth.service";
import {UserService} from "../Services/User.Service";
import {User} from "../Classes/User";

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {
  listUsers: User[] = [];
  selectedUserId: number = 0;


  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home']);
  }

  loadUsers() {
    this.userService.getsUserAgency().subscribe(users => {
      this.listUsers = users
    })
  }

  disableUser() {
    this.userService.disableUser(this.selectedUserId).subscribe(data => {
      this.loadUsers()
    })
  }

  enableUser(id:number) {
    this.userService.enableUser(id).subscribe(data => {
      this.loadUsers()
    })
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUserId).subscribe(data => {
      this.loadUsers()
    })
  }
}
