import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgencyComponent } from './agency/agency.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { UserblogsComponent } from './userblogs/userblogs.component';
import { LoginCComponent } from './login-c/login-c.component';
import { AgeventsComponent } from './agevents/agevents.component';
import { AgencySigninComponent } from './agency-signin/agency-signin.component';
import { AdminComponent } from './admin/admin.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEventsComponent } from './user-events/user-events.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { ReservationComponent } from './reservation/reservation.component';
import {AuthGuard} from "./_auth/auth-guard.service";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    AgencyComponent,
    EventsComponent,
    LoginComponent,
    SignupComponent,
    BlogsComponent,
    HomeComponent,
    UserblogsComponent,
    LoginCComponent,
    AgeventsComponent,
    AgencySigninComponent,
    AdminComponent,
    AdminsignupComponent,
    UserEventsComponent,
    UserHistoryComponent,
    CreateEventComponent,
    ProfilComponent,
    DashboardComponent,
    ListUtilisateurComponent,
    ReservationComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
