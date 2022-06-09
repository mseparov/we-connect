import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { appendFile } from 'fs';
import { Observable } from 'rxjs';
import { DataService } from '../helper-components/data.service';
import Speech from 'speak-tts';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VoiceRecognitionService]
})
export class HomeComponent implements OnInit {

  jobs:any = [];

  speech: any;
  speechData: any;

  fontSize = 22;

  voiceRecognitionData = "";
  currentJob = 1;

  subscription:any = {};

  constructor(private firestore: AngularFirestore, private data: DataService, public voiceRecognition : VoiceRecognitionService) {

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
    this.data.fireStoreData.subscribe((data)=>{
      
      this.jobs = data;

    });
    console.log(this.jobs);


    // voice recognition logic
    this.subscription = this.data.voiceRecognitionData.subscribe((data)=>{
      this.voiceRecognitionData = data;
      // console.log("Voice recognition data: ", this.voiceRecognitionData)
      if(/^\d+$/.test(data) && parseInt(data) <= this.jobs.length && parseInt(data) > 0){
        this.currentJob = parseInt(data);
        this.speakVoiceRecog();
        console.log("First Condition");
      }
      else if(data == "next" && this.currentJob < this.jobs.length && this.currentJob > 0){
        this.currentJob += 1;
        this.speakVoiceRecog();
        console.log("Second Condition");
      }
      else if(data == "previous" && this.currentJob <= this.jobs.length && this.currentJob > 1){
        this.currentJob -= 1;
        this.speakVoiceRecog();
        console.log("Third Condition");
      }
      else if(data == "repeat" || data == "again" && this.currentJob <= this.jobs.length && this.currentJob > 0){
        this.speakVoiceRecog();
        console.log("Fourth Condition");
      }

      if(data == "stop"){
        window.location.reload();
      }

      if(data == "bigger"){
        this.IncreaseFontSize();
      }
      if(data == "smaller"){
        this.DecreaseFontSize();
      }

    })

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

  speakVoiceRecog(){
    let currentJob = this.currentJob - 1;
    let job = this.jobs[currentJob];
    console.log(job)
    this.speech.speak({
      text: "Job title. " + job.job_title + "." + 
      "Job description. " + job.job_description + "." +
      "Company name. " + job.company_name + "." +
      "Company email. " + job.company_email + "." +
      "Company phone. " + job.company_phone + "." +
      "Date posted. " + job.timestamp + "."
    }).then(()=>{
      console.log("Success!");
    }).catch((e:any)=>{
      console.error("An error occurred: ", e);
    })
  }

  IncreaseFontSize() {
    if(this.fontSize<42)
    this.fontSize += 2;
   }
   DecreaseFontSize() {
    if(this.fontSize>16)
    this.fontSize -=2;
   }

   startService(){
    this.voiceRecognition.start();
  }
  stopService(){
    this.voiceRecognition.stop();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.data.setVoiceRecognitionData("");
}

}
