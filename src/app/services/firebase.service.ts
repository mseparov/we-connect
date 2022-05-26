import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  urlCheck: string = "";
  href: string = "";

  constructor(public firebaseAuth : AngularFireAuth, private router: Router) { 
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
  });
  }


  async login(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=>{
      this.isLoggedIn = true
      localStorage.setItem("user", JSON.stringify(res.user))
      console.log("Succesfully logged in: ", res.user?.email)
      this.router.navigate(["/home"])
    }).catch((error)=>{
        console.error("Failed to login", error)
        alert("Sorry, your email or password is incorrect. Please try again.")
      })
  }

  async signup(email: string, password: string){
    if(email.length!=0 || password.length!=0){
    if(password.length >= 6){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res=>{
      this.isLoggedIn = true
      localStorage.setItem("user", JSON.stringify(res.user))
      alert("User registered");
      console.log("Successfully registered: ", res.user?.email)
      this.router.navigate(["/home"])
    }).catch((error)=>{
      console.error("Failed to register", error);
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use.");
    } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
    } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
    } else if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
    }
      else{
      alert("Something went wrong.")
    }
    })
  }
  else{
    alert("Password must be over 6 characters");
  }
  }
  else{
    alert("You must fill in all the fields.")
  }
}

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem("user")
  }


}
