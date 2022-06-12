import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DataService } from "../helper-components/data.service";
import {Router} from "@angular/router";
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  template: "The href is: {{href}}",
})
export class NavBarComponent implements OnInit {

    public href: string = "";
    public urlCheck: string = "";

    // default dark (true) or light mode (false)
    isDisplay = false;
  
    toggle_dm(){
      this.isDisplay = !this.isDisplay;
      
        this.data.setDarkModeChange(this.isDisplay);
    
    }

    constructor(private router: Router, public data: DataService, public firebaseService: FirebaseService) {

      // additional buttons colored page indicator
      router.events.subscribe((val) => {

        this.href = window.location.href;
      
      if(this.href.includes("/home")){
        this.urlCheck="home"
      }
      if(this.href.includes("/about")){
        this.urlCheck="about"
      }
      if(this.href.includes("/signup")){
        this.urlCheck="signup"
      }
      if(this.href.includes("/login")){
        this.urlCheck="login"
      }
      if(this.href.includes("/forum")){
        this.urlCheck="forum"
      }
      if(this.href.includes("/job-posting")){
        this.urlCheck="job-posting"
      }
    });
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.firebaseService.logout()
    this.data.setLoginChange(false)
    console.log(this.data.isLoggedIn.value)
    console.log("Logged out.")
    this.router.navigate(["/home"])
    window.location.reload();
  }

}
