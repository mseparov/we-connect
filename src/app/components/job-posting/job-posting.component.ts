import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {

  job_title = "";
  job_description = "";
  company_name = "";
  company_phone = "";
  company_email = "";

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }


  async submit(){
    if(this.job_title != "" && this.job_description != "" && this.company_name != "" && this.company_phone != "" && this.company_email != ""){

      await this.firestore.collection("jobs").doc(this.job_title.replace(/ /g,"_")).set({
        job_title: this.job_title,
        job_description: this.job_description,
        company_name: this.company_name,
        company_phone: this.company_phone,
        company_email: this.company_email,
        timestamp:  Date.now(),
        id: this.company_name.replace(/ /g,"_") + "_" + this.job_title.replace(/ /g,"_")
      }).then(()=>{
        alert("Job posted!");
        console.log("Job posted!");
        window.location.reload();
      }).catch((e:any)=>{
        alert("Something went wrong...");
      })

    }
    else{
      alert("Fill in all the fields!")
    }
  }


}
