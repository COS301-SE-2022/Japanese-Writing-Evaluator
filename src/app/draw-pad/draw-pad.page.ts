import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Router } from '@angular/router';
@Component({
  selector: 'app-draw-pad',
  templateUrl: './draw-pad.page.html',
  styleUrls: ['./draw-pad.page.scss'],
})
export class DrawPadPage implements AfterViewInit {

  @ViewChild('canvas') canvasEl: ElementRef;
  signaturePad: SignaturePad;
  signatureImg: string;

  constructor(private router: Router) { }
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

  onLogout(){
    // this function logs the user out of the system
    localStorage.removeItem('id');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);

  }

}
