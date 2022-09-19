import { Component, OnInit } from '@angular/core';
import { ObjectDetectionService } from 'src/app/services/objectDetection/object-detection.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(public objDetectionService: ObjectDetectionService) { }

  ngOnInit() {}

  takePhoto(){
    this.objDetectionService.getPicture();
  }

}
