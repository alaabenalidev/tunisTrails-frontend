import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AgencyComponent } from './agency/agency.component';
import { EventsComponent } from './events/events.component'
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserblogsComponent } from './userblogs/userblogs.component';
import { LoginCComponent } from './login-c/login-c.component';
import { AgeventsComponent } from './agevents/agevents.component';
import { AgencySigninComponent } from './agency-signin/agency-signin.component';
import { AdminComponent } from './admin/admin.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Import the DashboardComponent
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { ReservationComponent } from './reservation/reservation.component';
import {AuthGuard} from "./_auth/auth-guard.service";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home by default
  { path: 'home', component: HomeComponent }, // Route for the home page
  { path: 'blogs', component: BlogsComponent }, // Route for displaying blogs
  { path: 'agency', component: AgencyComponent }, // Route for the agency page // for client
  { path: 'events', component: EventsComponent}, // Route for displaying events
  { path: 'signup', component: SignupComponent }, // Route for the signup page // for client
  { path: 'login', component: LoginComponent }, // Route for the login page // for client
  { path: 'userblogs', component: UserblogsComponent}, // Route for displaying user blogs
  { path : 'loginC', component: LoginCComponent},// Route for displaying loginCComponent // for agency
  { path : 'agevents' , component: AgeventsComponent }, // Route for displaying loginCComponent // for agency
  { path : 'agency-signin' , component: AgencySigninComponent }, // Route for displaying loginCComponent
  { path : 'admin', component: AdminComponent, canActivate: [AuthGuard] }, //Route for displaying adminComponent
  { path : 'adminsignup', component: AdminsignupComponent }, //Route for displaying AdminsignupComponent // to ignore
  { path : 'user-events', component: UserEventsComponent, canActivate: [AuthGuard], }, //Route for UserEventsComponent // for client
  { path : 'user-history', component: UserHistoryComponent, canActivate: [AuthGuard] }, //Route for displaying UserHistoryComponent // for client
  { path : 'create-event', component: CreateEventComponent, canActivate: [AuthGuard] }, //Route for displaying CreateEventComponent // for agency
  { path : 'profil', component: ProfilComponent, canActivate: [AuthGuard] }, //Route for displaying CreateEventComponent // for client
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Route for displaying DashboardComponent // for admin
  { path: 'list-utilisateur', component: ListUtilisateurComponent, canActivate: [AuthGuard] }, // Route for displaying ListUtilisateurComponent // for admin
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] }, // Route for displaying ListUtilisateurComponent // for client
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' } // Redirect to home if route not found
];

// create agency to verify => admin

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
