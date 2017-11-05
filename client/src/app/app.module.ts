import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component'; 
import { FlashMessagesModule } from 'angular2-flash-messages'; 
import { AuthGuard } from './services/auth.guard';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule, 
    FlashMessagesModule,
     RouterModule.forRoot([
      //anonumous Users 
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
      { path: 'blog', component: BlogComponent,canActivate: [AuthGuard] },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [ AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
