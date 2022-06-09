import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DataService } from "./components/helper-components/data.service";
import {Router} from "@angular/router";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';

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

    constructor(private data: DataService, private router: Router, private firestore: AngularFirestore, public voiceRecognition : VoiceRecognitionService){ 
      this.voiceRecognition.init();
      this.voiceRecognition.start();
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


      //setting login change
      if(localStorage.getItem('user') !== null){
        this.data.setLoginChange(true)
      }
      else{
        this.data.setLoginChange(false)
      }

      console.log(this.data.isLoggedIn.value);


      //getting firestore data
      let jobs:any = [];

      var docref = this.firestore.collection("jobs");
      docref.ref.orderBy("timestamp", "desc").limit(100).get()
      .then((data) => {
        for (let i = 0; i < data.docs.length; i++){
          if (data.docs[i].exists) {
  
            jobs.push(data.docs[i].data());
  
        } else {
            console.error('No matching document found.');
        }
      }

      for (let i = 0; i < jobs.length; i++){
        let timestamp = jobs[i].timestamp;
        timestamp = new Date(timestamp).toLocaleString("en-UK");
        jobs[i].timestamp = timestamp;
      }

        console.log(jobs);
        this.data.setFireStoreData(jobs);

      }) 
      .catch(e=>{
        console.error("Firebase 'Get' failed: ", e)
      })


    }
}
