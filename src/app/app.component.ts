import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MainPage } from './../pages/main/main';
import { HomePage } from './../pages/home/home';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private afAuth: AngularFireAuth,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private screenOrientation: ScreenOrientation) {

    

    this.afAuth.authState.subscribe(user => {

      if(user !== null){
        this.rootPage = MainPage;
        platform.ready().then(() => {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
          statusBar.hide();
          statusBar.styleDefault();
          splashScreen.hide();
        });
      }

      platform.ready().then(() => {

        statusBar.hide();
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });

  }
}

