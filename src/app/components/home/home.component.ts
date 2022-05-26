import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { appendFile } from 'fs';
import { Observable } from 'rxjs';
import { DataService } from '../helper-components/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs:any = [];

  constructor(private firestore: AngularFirestore, private firestoreData: DataService) { 

  }
  

  ngOnInit(): void {

    // get firestore data from data.service and put it into a local array
    this.firestoreData.fireStoreData.subscribe((data)=>{
      
      this.jobs = data;

    });
    
    console.log(this.jobs);

  }


}
