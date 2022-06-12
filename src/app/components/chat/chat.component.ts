import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../helper-components/data.service';
import Speech from 'speak-tts';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [VoiceRecognitionService]
})
export class ChatComponent implements OnInit{

  messages:any = [];
  inputMessage:any = "";
  currentUser:any = "";
  scrollCheck: number = 0;

  constructor(private firestore: AngularFirestore, private data: DataService, public voiceRecognition : VoiceRecognitionService, public firebaseService : FirebaseService) { 

  }

  ngOnInit(): void {

    // get current user data
    this.currentUser = localStorage.getItem("user");
    this.currentUser = JSON.parse(this.currentUser);
    this.currentUser = this.currentUser.email;

    this.getMessages();
    
  }

  // scroll to the bottom of the chat on page load
  public ngAfterViewChecked(): void {
  // gets executed as long as the scroll wasnt successfull, so the (successful) scroll only gets executed once
    if (this.scrollCheck < 25) {    
      this.scrollToBottom();
      this.scrollCheck += 1;
    }
  }

      // send messages to firebase
  pushMessages(){
    if(localStorage.getItem('user') !== null){
    console.log(this.inputMessage);
    if(this.inputMessage != ''){
 // save searchterm in the database
    this.firestore.collection("ChatMessages").add({
      value: this.inputMessage,
      email: this.currentUser,
      sent_at: Date.now()
    })
    .then((stored) => {
      console.log('Spremljeno'/*,stored*/);
      this.inputMessage = "";
      this.getMessages();
    })
    .catch((e) => {
      console.error(e);
    })
    // scrolls to the bottom of the chat
    this.scrollToBottom();
  }
 else{
     console.error("empty message");
 }
}
else{
  alert("Signup or Login to chat!")
}
}


getMessages(){
  var docref = this.firestore.collection("ChatMessages");
  docref.ref.orderBy("sent_at", "desc").limit(50).get()
    .then((query)=> {
      this.messages = [];

      query.forEach((message)=>{
        const data = message.data();

        //console.log(data)
       //console.log(data.searched_at)
        
        this.messages.push({
          id: message.id,
          data: data
        })
      })

      this.messages.forEach((el:any) => {
        let date:any = new Date(el.data.sent_at);
        date = date.toLocaleString("en-UK");
        el.data.sent_at = date;
      });
     this.messages.reverse(); //if you want messages to appear at the bottom
     console.log(this.messages);
  })
  .catch((e)=> {
    console.error(e);
  })
  this.scrollToBottom();
}

// scrolling to the bottom of the chat
@ViewChildren('messages') messageElement: QueryList<any>;
@ViewChild('content', { static: false }) contentElement: ElementRef;
scrollToBottom = () => {
  try {
    this.contentElement.nativeElement.scrollTop = this.contentElement.nativeElement.scrollHeight+100;
  } catch (err) {}
}


}
