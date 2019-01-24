import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeTransitionOptions,NativePageTransitions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  slides: any[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativePageTransitions: NativePageTransitions) {
  


    this.dir = platform.dir();
    this.slides = [
      {
   
        image: '../../assets/backgrounds/slides/sli1.png',
      },
      {

        image: 'assets/backgrounds/slides/sli2.png',
      },
      {
    
        image: 'assets/backgrounds/slides/sli5.png',
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  };

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  goToMainPage(){
    // this.navCtrl.setRoot(MainPage);
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 2000,
      slowdownfactor: 2,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 200,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     };
    this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot(MainPage);
  }

}
