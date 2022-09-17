// import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import { Platform } from '@ionic/angular';

// @Component({
//   selector: 'app-drawing-pad',
//   templateUrl: './drawing-pad.page.html',
//   styleUrls: ['./drawing-pad.page.scss'],
// })
// export class DrawingPadPage implements AfterViewInit {
//   @ViewChild('drawingPad', {static: false}) canvas: any;
//   canvasElement: any;
//   drawing = false;

//   saveX: number;
//   saveY: number;

//   selectedColour = '#00000';
//   lineWidth = 1;

//   constructor(private plt: Platform) { }

//   ngAfterViewInit() {
//     this.canvasElement = this.canvas.nativeElement;
//   }

//   ngOnInit() {
//   }

//   //TODO: note when user starts to draw, #, Maryam Mohamad Al Mahdi
//   startDrawing(ev, tool: string){
//     this.drawing = true;
//     const canvasPosition = this.canvasElement.getBoundingClientRect();

//     if(tool == 'mouse'){
//       this.saveX = ev.clientX - canvasPosition.x;
//       this.saveY = ev.clientY - canvasPosition.y;
//     }
//     else{
//       this.saveX = ev.changedTouches[0].pageX - canvasPosition.x;
//       this.saveY = ev.changedTouches[0].pageY - canvasPosition.y;
//     }
//     console.log('start ', ev);
//   }

//   //TODO: note when user draws, #, Maryam Mohamad Al Mahdi
//   moved(ev, tool: string){
//     if(!this.drawing){
//       return;
//     }

//     const canvasPosition = this.canvasElement.getBoundingClientRect();
//     let ctx = this.canvasElement.getContext('2d');

//     let currentX = 0;
//     let currentY = 0;

//     if(tool == 'mouse'){
//       currentX = ev.clientX - canvasPosition.x;
//       currentY = ev.clientY - canvasPosition.y;
//     }
//     else{
//       currentX = ev.changedTouches[0].pageX - canvasPosition.x;
//       currentY= ev.changedTouches[0].pageY - canvasPosition.y;
//     }

//     ctx.lineJoin = 'round';
//     ctx.strokeStyle = this.selectedColour;
//     ctx.lineWidth = this.lineWidth;

//     ctx.beginPath();
//     ctx.moveTo(this.saveX,this.saveY);
//     ctx.lineTo(currentX, currentY);
//     ctx.closePath();

//     ctx.stroke();

//     this.saveX = currentX;
//     this.saveY = currentY;
//     console.log('move ', ev);
//     console.log(canvasPosition);

//     //console.log(currentX, currentY);
//   }

//   //TODO: note when user finishes drawing, #, Maryam Mohamad Al Mahdi
//   endDrawing(){
//     this.drawing = false;
//     //console.log('end');
//   }

// }

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-drawing-pad',
  templateUrl: './drawing-pad.page.html',
  styleUrls: ['./drawing-pad.page.scss'],
})
export class DrawingPadPage implements AfterViewInit {
  @ViewChild('drawingPad', {static: false}) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  selectedColor = '#9e2956';

  drawing = false;
  lineWidth = 5;

  constructor(private plt: Platform, private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController) {}

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }

  startDrawing(ev) {
    this.drawing = true;
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.changedTouches[0].pageX - canvasPosition.x;
    this.saveY = ev.changedTouches[0].pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  moved(ev) {
    if (!this.drawing) return;

    var canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');

    let currentX = ev.changedTouches[0].pageX - canvasPosition.x;
    let currentY = ev.changedTouches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }
}
