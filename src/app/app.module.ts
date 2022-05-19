import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForumComponent } from './components/forum/forum.component';


const appRoutes: Routes = [
   {path: 'home', component: HomeComponent},
   {path: "", redirectTo: "/home", pathMatch: "full"},
   {path: 'about', component: AboutComponent},
   {path: 'signup', component: SignupComponent},
   {path: 'login', component: LoginComponent},
   {path: 'forum', component: ForumComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    SignupComponent,
    LoginComponent,
    ForumComponent,
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes, {enableTracing: false}), 
    MatIconModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
