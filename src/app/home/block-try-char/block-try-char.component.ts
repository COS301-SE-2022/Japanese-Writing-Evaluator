import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/appService/app-service.service';
import { CharacterImage } from 'src/app/shared/interfaces/image';
import { PopoverController } from '@ionic/angular';
import { PopOverUploadPage } from '../pop-over-upload/pop-over-upload.page';

@Component({
  selector: 'app-block-try-char',
  templateUrl: './block-try-char.component.html',
  styleUrls: ['./block-try-char.component.scss'],
})
export class BlockTryCharComponent implements OnInit {

  @Input() letter: string;
  @Input() translate: string;
  @Input() group: string;
  constructor(private service: AppServiceService, private router: Router, private popCtrl: PopoverController) { }

  ngOnInit() {}

    //TODO: add navigation to upload page, #, Phumu
    setCharacterImage(){
      //send image to the upload page and redirect to upload page
      const image: CharacterImage ={
        characterName: this.translate,
        group: this.group,
        url: this.letter
      };
      this.service.setTryImage(image);
    }

    //TODO: Opens the popover, #203, Maryam
  async openPopover(ev: any){
    this.setCharacterImage();
    const popover =  await this.popCtrl.create({
      component: PopOverUploadPage,
      event: ev,
    });
    await popover.present();
  }

}
