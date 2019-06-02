import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['../app.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public messageService : MessageService, public toastController: ToastController) { }

  ngOnInit() {
     this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.messageService.messages,
      duration: 2000
    });
    toast.present();
  }



}
