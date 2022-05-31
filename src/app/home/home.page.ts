import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
import { AppServiceService } from '../services/app-service.service';
import { ProgressPage } from '../progress/progress.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  image: File = null;
  upload: FormGroup;
  constructor(formBuilder: FormBuilder, private router: Router, private progressProp: ProgressPage) {
    this.upload = formBuilder.group({ // building a responsive form with two inputs
      image: new FormControl('',[Validators.required]),
    });
  }//private repository: AppServiceService

  getImage(event){
    this.image = event.target.files[0];
  }

  uploadImage(){
  }

  setProgress(){
    const progress =[
      {char: 'i', percent: 0.8},
      {char: 'e', percent: 0.26},
      {char: 'a', percent: 0.54},
    ];
    if (!localStorage.getItem('char') && !localStorage.getItem('percentage')) {
      localStorage.setItem('char',progress[0].char);
      localStorage.setItem('percentage',progress[0].percent.toString());
    }
    //this.progressProp.setDisplay(progress[0].char,progress[0].percent);
    this.router.navigate(['/progress']);
  }

  ngOnInit(): void {

  }


}
