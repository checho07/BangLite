import { ProfilePage } from './../pages/profile/profile';
import { MainPage } from './../pages/main/main';
import { NativeStorage } from '@ionic-native/native-storage';
import { SignUpFormPage } from './../pages/sign-up-form/sign-up-form';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnimationService, AnimatesDirective} from 'css-animator';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { LottieAnimationViewModule } from 'lottie-angular2';
import { IdeasPage } from '../pages/ideas/ideas';
import { identifierModuleUrl } from '@angular/compiler';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCuhUgaqcJk2OrSIF-CsCnTxHRSFKI4ye0",
    authDomain: "banglite.firebaseapp.com",
    databaseURL: "https://banglite.firebaseio.com",
    projectId: "banglite",
    storageBucket: "",
    messagingSenderId: "53725024997"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,LoginPage,
    AnimatesDirective,
    SignUpFormPage,
    TutorialPage,
    MainPage,
    ProfilePage,
    IdeasPage

  ],
  imports: [
    BrowserModule,
    LottieAnimationViewModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      popoverLeave:'wp-transition',
      monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }),
    AngularFireModule.initializeApp(environment.firebase, 'BangLite'),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,LoginPage,
    SignUpFormPage,
    TutorialPage,
    MainPage,
    ProfilePage,
    IdeasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AnimationService,
    NativeStorage,
    NativePageTransitions,


    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
