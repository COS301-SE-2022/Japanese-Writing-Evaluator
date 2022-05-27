import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ref, uploadBytesResumable, getDownloadURL, listAll } from '@firebase/storage';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
// import { storage, app } from 'Storage/firebaseConfig';
// import { AppServiceService } from '../services/app-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    //this.suggestCharacter();
  }

  // suggestCharacter()
  // {
  //   //eslint-disable-nextline prefer-const
  //   const images: string[] = [];
  //   //eslint-disable-nextline prefer-const
  //   const suggested: string[] = [];
  //   const folderRef = ref(storage, 'characters/Hiragana');

  //   listAll(folderRef).then((response) => {
  //     response.items.forEach((pictures) => {
  //       getDownloadURL(pictures).then((urls) => {
  //         images.push(urls.toString());
  //         if(response.items.length === images.length)
  //         {

  //           let random = 0;
  //           let chosen = 0;
  //           for(let i = 0; i < 2; i++)
  //           {
  //             random = Math.floor(Math.random() * images.length);
  //             if(i === 0)
  //             {
  //               suggested.push(images[random]);
  //             }
  //             else
  //             {
  //               if(chosen === random)
  //               {
  //                 while(chosen === random)
  //                 {
  //                   random = Math.floor(Math.random() * images.length);
  //                 }
  //                 suggested.push(images[random]);
  //               }
  //               else
  //               {
  //                 suggested.push(images[random]);
  //               }
  //             }

  //             chosen = random;
  //           }

  //           console.log(suggested);
  //           console.log(suggested.length);
  //           const img1 = document.getElementById('suggest1');
  //           img1.setAttribute('src', suggested[0]);
  //           const img2 = document.getElementById('suggest2');
  //           img2.setAttribute('src', suggested[1]);
  //         }
  //       });
  //     });
  //   });
  // }

}
