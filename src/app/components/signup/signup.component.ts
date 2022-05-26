import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from "../helper-components/data.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoggedIn = false

  constructor(public firebaseService : FirebaseService, private data: DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null){
      this.data.setLoginChange(true)
      this.isLoggedIn = this.data.isLoggedIn.value;
      console.log(this.data.isLoggedIn.value)
    }
    else{
      this.data.setLoginChange(false)
      this.isLoggedIn = this.data.isLoggedIn.value;
      console.log(this.data.isLoggedIn.value)
    }

  }

  async onSignup(email:string, password:string){
    await this.firebaseService.signup(email, password).then(()=>{
      if(this.firebaseService.isLoggedIn){
        this.data.setLoginChange(true)
        this.isLoggedIn = this.data.isLoggedIn.value;
        console.log(this.data.isLoggedIn.value)
      }
      })
      .catch((e)=>{
        console.log("Signup Failed.", e)
        alert("Something went wrong. Do you already have an account associated with this email?.")
      })
}


}
