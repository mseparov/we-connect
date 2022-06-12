import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForumComponent } from './components/forum/forum.component';
import { FirebaseService } from './services/firebase.service';
import { AuthGuard } from './components/routing/auth.guard';
import { JobPostingComponent } from './components/job-posting/job-posting.component';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './components/chat/chat.component';


const appRoutes: Routes = [
   {path: 'home', component: HomeComponent},
   {path: "", redirectTo: "/home", pathMatch: "full"},
   {path: 'about', component: AboutComponent},
   {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
   {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
   {path: 'forum', component: ForumComponent},
   {path: 'job-posting', component: JobPostingComponent}
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
    JobPostingComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes, {enableTracing: false}), 
    MatIconModule, 
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [FirebaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
