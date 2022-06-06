import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { appendFile } from 'fs';
import { Observable } from 'rxjs';
import { DataService } from '../helper-components/data.service';
import Speech from 'speak-tts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs:any = [];

  speech: any;
  speechData: any;

  constructor(private firestore: AngularFirestore, private firestoreData: DataService) {

    this.speech = new Speech() // will throw an exception if not browser supported

    if(this.speech.hasBrowserSupport()) { // returns a boolean
      //console.log("speech synthesis supported")
      this.speech.init({
              'volume': 1,
              'lang': 'en-GB',
              'rate': 1,
              'pitch': 1,
              'voice':'Google UK English Male',
              'splitSentences': true,
              'listeners': {
                  'onvoiceschanged': (voices:any) => {
                    //console.log("Event voiceschanged", voices)
                  }
              }
      }).then((data:any) => {
          // The "data" object contains the list of available voices and the voice synthesis params
          //console.log("Speech is ready, voices are available", data)
          this.speechData = data;
          //data.voices.forEach((voice:any) => {
          //console.log(voice.name + " "+ voice.lang)
          //});
      }).catch((e:any) => {
          console.error("An error occured while initializing : ", e)
      })
  }

  }
  

  ngOnInit(): void {

    // get firestore data from data.service and put it into a local array
    this.firestoreData.fireStoreData.subscribe((data)=>{
      
      this.jobs = data;

    });
    console.log(this.jobs);

  }

  speak(description:any, data:any){

    this.speech.speak({
      text: description + data,
    }).then(()=>{
      console.log("Success!");
    }).catch((e:any)=>{
      console.error("An error occurred: ", e);
    })
  }

  
}
