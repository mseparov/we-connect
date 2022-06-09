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
    public isLoggedIn = new BehaviorSubject<boolean>(false);
    public fireStoreData = new BehaviorSubject<boolean>(false);
    public voiceRecognitionData = new BehaviorSubject<string>("");

    setDarkModeChange(selection: any){
      this.darkModeChange.next(selection);
  }

  setLoginChange(selection: any){
    this.isLoggedIn.next(selection);
}

setFireStoreData(selection: any){
  this.fireStoreData.next(selection);
}

setVoiceRecognitionData(selection: any){
  this.voiceRecognitionData.next(selection);
}

  
}