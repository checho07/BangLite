import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {AnimationService, AnimationBuilder} from 'css-animator';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private animator: AnimationBuilder;
   options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 2,
    slidePixels: 0,
    iosdelay: 100,
    androiddelay: 10,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 0
   };
  
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public as:AnimationService,
              private nativePageTransitions: NativePageTransitions) {

                this.animator = as.builder();
                this.scrollBack();
                this.fadeInBtns();
  }
  presentProfileModalSignUp() {

    this.nativePageTransitions.fade(this.options);
    let profileModal = this.modalCtrl.create(RegisterPage);
    profileModal.present();
  };

  presentProfileModalLogIn(){
    
    this.nativePageTransitions.fade(this.options);
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





