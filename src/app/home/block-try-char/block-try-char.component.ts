import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { CharacterImage } from 'src/app/shared/interfaces/image';

@Component({
  selector: 'app-block-try-char',
  templateUrl: './block-try-char.component.html',
  styleUrls: ['./block-try-char.component.scss'],
})
export class BlockTryCharComponent implements OnInit {

  @Input() letter: string;
  @Input() translate: string;
  @Input() group: string;
  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit() {}

    //TODO: add navigation to upload page, #, Phumu
    showUploadPage(){
      //send image to the upload page and redirect to upload page
      const image: CharacterImage ={
        characterName: this.translate,
        group: this.group,
        url: this.letter
      };
      this.service.setTryImage(image);
      this.router.navigate(['/upload']);
    }

}
