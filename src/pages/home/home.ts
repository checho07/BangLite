import { RegisterPage } from './../register/register';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import {AnimationService, AnimationBuilder} from 'css-animator';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private animator: AnimationBuilder;
  
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public as:AnimationService) {

                this.animator = as.builder();
                this.scrollBack();
                this.fadeInBtns();
  }
  presentProfileModalSignUp() {
    let profileModal = this.modalCtrl.create(RegisterPage);
    profileModal.present();
  };

  presentProfileModalLogIn(){
    let profileModal = this.modalCtrl.create(LoginPage);
    profileModal.present();
  }



  scrollBack(){
    setTimeout( function() {
      document.getElementById("container").classList.add("animated");
     
    }, 1000)
  }
  fadeInBtns(){
    setTimeout( function() {      
      document.getElementById("btns").classList.add("fadeIn");
    }, 4500)
  };
  
}





