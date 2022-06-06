import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { CharacterImage, UploadedImage } from '../shared/image';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  characterImage: CharacterImage;
  uploadedImage: UploadedImage;

  //TODO:add form parameters to constructor, #71, Phumu
  constructor(private service: AppServiceService) { }

  //TODO: get the character image to be practiced, #71, Phumu
  ngOnInit() {
    this.characterImage = this.service.getTryImage();
  }

  //TODO: show popover when evaluate is clicked, #71, Phumu
  showScore() {
    //
  }

  //TODO: send image to backend to be evaluated by the AI, #71, Phumu
  evaluateImage() {
    if (this.uploadedImage.uploadedImage != null && localStorage.getItem('id') !== '') {
      this.uploadedImage.group = this.characterImage.group;
      this.uploadedImage.characterName = this.characterImage.characterName;
      this.uploadedImage.userId = localStorage.getItem('id');

      this.service.uploadImage(this.uploadedImage);
      this.showScore(); // get the score
    }
  }

  //TODO: get uploaded image from the file input, #71, Phumu
  getUploadedImage($event){
    this.uploadedImage.uploadedImage = $event.target.files[0];
  }

}
