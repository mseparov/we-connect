import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor() { }

  user:any = [{}]

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.user = JSON.parse(this.user)
    console.log("user: ", this.user.email)
  }

}
