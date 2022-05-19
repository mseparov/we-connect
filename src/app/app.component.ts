import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DataService } from "./components/helper-components/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'we-connect';

    // default dark (false) or light mode (true)
    darkModeCheck:boolean = true;

    constructor(private data: DataService){ 
    }
  
    ngOnInit(){
      //getting light or dark mode data
      this.data.darkModeChange.subscribe((data)=>{
        this.darkModeCheck = !this.darkModeCheck;
        if(this.darkModeCheck){
          document.body.style.background = "black";
        }else{
         document.body.style.background = "rgb(244, 246, 248)"
        }
      })
    
    }

}
