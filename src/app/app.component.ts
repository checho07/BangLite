import { ProfilePage } from './../pages/profile/profile';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { MainPage } from './../pages/main/main';
import { SignUpFormPage } from './../pages/sign-up-form/sign-up-form';
import { HomePage } from './../pages/home/home';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { IdeasPage } from '../pages/ideas/ideas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ProfilePage;

  constructor(private afAuth: AngularFireAuth,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      this.afAuth.authState.subscribe(user => {

        if(user !== null){
          this.rootPage = MainPage;
        }
      });
      statusBar.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

