import { Component, OnInit } from '@angular/core';
import { ref, getDownloadURL, listAll, getStorage } from 'firebase/storage';
// import { AppServiceService } from '../services/app-service.service';
// import { Character } from '../shared/character';
import { storage, app } from 'Storage/firebaseConfig'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // characters: Character[] = [];
  constructor() {}//private repository: AppServiceService

  ngOnInit(): void {
    // this.repository.getCharacters().subscribe(res => {
    //   this.characters = res;
    // });

    suggestCharacter();
    // this.repository.getProgress();
      // var images = suggestCharacter();
      // var suggestion1 = document.getElementById("Suggestion1");
      // suggestion1.innerHTML = 
      // '<img alt="Suggestion" src="'+images[0]+'"/>'
      // + '<ion-button  color="dark" id="try">Try</ion-button>';

      // var suggestion2 = document.getElementById("Suggestion2");
      // suggestion2.innerHTML = 
      // '<img alt="Suggestion" src="'+images[1]+'"/>'
      // + '<ion-button  color="dark" id="try">Try</ion-button>';
  }

  // uploadImage(){
  //   //when uploadimage button is click
  //   this.repository.uploadImage();
  // }

}

function suggestCharacter()
  {
    let images = [];
    const folderRef = ref(storage, "characters/Hiragana");

    listAll(folderRef).then((response) => {
    
      response.items.forEach((pictures) => {
        getDownloadURL(pictures).then((urls) => {
          images.push(urls);
          if(response.items.length == images.length)
          {
            var random = 0;
            var suggested = [];
            var chosen = 0;
            for(var i = 0; i < 2; i++)
            {
              random = Math.floor(Math.random() * images.length);
              if(i == 0)
              {
                suggested.push(images[random]);
              }
              else
              {
                if(chosen == random)
                {
                  while(chosen == random)
                  {
                    random = Math.floor(Math.random() * images.length);
                  }
                  suggested.push(images[random]);
                }
                else
                {
                  suggested.push(images[random]);
                }
              }

              chosen = random;
            }

            console.log(suggested);
            console.log(suggested.length);
            var img1 = document.getElementById("suggest1");
            img1.setAttribute("src", suggested[0]);
            var img2 = document.getElementById("suggest2");
            img2.setAttribute("src", suggested[1]);
          
          }
        })
      })
    })
    
  }
