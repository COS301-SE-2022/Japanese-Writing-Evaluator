import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-pop-over-upload',
  templateUrl: './pop-over-upload.page.html',
  styleUrls: ['./pop-over-upload.page.scss'],
})
export class PopOverUploadPage implements OnInit {

  list: string[];
  constructor(private popOverCtrl: PopoverController, private router: Router) { }

  ngOnInit() {
    this.list = ['upload submission', 'draw submission'];
  }

  popoverOption(item: string){

    if(item === this.list[0]){
        this.router.navigate(['./upload']);
        this.popOverCtrl.dismiss();
    }
    this.router.navigate(['./drawing-pad']);
    this.popOverCtrl.dismiss();
}


}
