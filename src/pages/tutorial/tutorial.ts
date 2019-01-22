import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
  
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

}
