import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
  })

  
export class DataService{
    
    constructor(private router: Router){
   
      }

    public darkModeChange = new BehaviorSubject<boolean>(false);

    setDarkModeChange(selection: any){
      this.darkModeChange.next(selection);
  }

  
}