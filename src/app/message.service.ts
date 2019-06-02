import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
    messages: string[] = ['je suis un toast', 'et moi aussi'];
    toastController: ToastController;

    add(message: string) {
        this.messages.push(message);
        this.presentToast();
    }

    clear() {
        this.messages = [];
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: this.messages,
        duration: 2000
      });
      toast.present();
    }
}
