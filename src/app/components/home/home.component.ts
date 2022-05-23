import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs:any = [
  {"title": "title", "description": "description", "email": "email", "company": "company", "telephone": "0123456789"},
  {"title": "title", "description": "description", "email": "email", "company": "company", "telephone": "0123456789"},
  {"title": "title", "description": "description", "email": "email", "company": "company", "telephone": "0123456789"},
  {"title": "title", "description": "description", "email": "email", "company": "company", "telephone": "0123456789"},
  {"title": "title", "description": "description", "email": "email", "company": "company", "telephone": "0123456789"},
  {"title": "title", "description": "description", "email": "email", "company": "company", "telephone": "0123456789"}
]

  constructor() { }

  ngOnInit(): void {
  }

}
