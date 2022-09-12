import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputCustomEvent, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privilege-modal',
  templateUrl: './privilege-modal.page.html',
  styleUrls: ['./privilege-modal.page.scss'],
})
export class PrivilegeModalPage implements OnInit {
  @Input() role;
  selectedRole: string;

  constructor(public modalController: ModalController, private router: Router) {}

  ngOnInit() {}

  //TODO: closes the modal, #183, Maryam Mohamad Al Mahdi
  close() {
    this.modalController.dismiss();
  }

//TODO: get event from change in radio group, #183, Maryam Mohamad Al Mahdi
  radioGroupChange($event){
    this.selectedRole = $event.target.value;
  }

  //TODO: update the privileges of current user, #183, Maryam Mohamad Al Mahdi
  updatePrivileges(){
    if(this.selectedRole !== undefined){
      console.log(this.selectedRole);
    }
  }

}

