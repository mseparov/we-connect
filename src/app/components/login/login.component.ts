import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from "../helper-components/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  async onLogin(email:string, password:string){
    await this.firebaseService.login(email, password).then(()=>{
      if(this.firebaseService.isLoggedIn){
        this.data.setLoginChange(true)
        this.isLoggedIn = this.data.isLoggedIn.value;
        console.log(this.data.isLoggedIn.value)
      }
      })
      .catch((e)=>{
        console.log("Login Failed.", e)
        alert("Something went wrong. Check if your password or email is right.")
      })
  }


}
