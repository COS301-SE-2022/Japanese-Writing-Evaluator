import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ref, uploadBytesResumable } from '@firebase/storage';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
import { storage, app } from 'Storage/firebaseConfig';
import { AppServiceService } from '../services/app-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  image: File = null;
  upload: FormGroup;
  constructor(formBuilder: FormBuilder, private repository: AppServiceService) {
    this.upload = formBuilder.group({ // building a responsive form with two inputs
      image: new FormControl('',[Validators.required]),
    });
  }//private repository: AppServiceService

  ngOnInit(): void {
    // this.repository.getCharacters().subscribe(res => {
    //   this.characters = res;
    // });

    // this.repository.getProgress();
  }

  getImage(event){
    this.image = event.target.files[0];
  }

  uploadImage(){
    //const storage = getStorage();
    console.log(this.upload.controls.image.value.split('\\').length-1);
    const imageurl= this.upload.controls.image.value.split('\\');//
    const imageRef = ref(storage,`users/${imageurl[imageurl.length-1]}`);
    const uploadTask = uploadBytesResumable(imageRef, this.image);
    uploadTask.on('state_changed',(err) =>{
      console.log(err);
    });
  //  this.repository.uploadImage(this.upload.controls.image.value);
  }
}
