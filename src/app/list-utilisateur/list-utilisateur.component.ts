import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_auth/auth.service";

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent {


  constructor(private router: Router, private authService: AuthService) {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home']);
  }
}
