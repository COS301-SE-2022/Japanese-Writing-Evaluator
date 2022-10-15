import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-draw-pad',
  templateUrl: './draw-pad.page.html',
  styleUrls: ['./draw-pad.page.scss'],
})
export class DrawPadPage implements AfterViewInit {

  @ViewChild('canvas') canvasEl: ElementRef;
  signaturePad: SignaturePad;
  signatureImg: string;

  constructor() { }
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
  }

  moved(event: Event) {
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }

}
