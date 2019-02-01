import { MainPage } from './../main/main';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NativeStorage } from '@ionic-native/native-storage';

export interface user {

  email: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public  SignInForm: FormGroup;
  user = {} as user;

  constructor(private afAuth: AngularFireAuth,
              public forgotCtrl: AlertController,
              public navCtrl: NavController,
              public nav: NavController,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage,
              public navParams: NavParams,
              private formBuilder:FormBuilder,
              public viewCtrl: ViewController) {

                let emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";

                this.SignInForm = this.formBuilder.group({
                  email:["",[Validators.required, Validators.pattern(emailPattern)]],
                  password:["",Validators.required]

                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  };

  dismiss(){
    this.viewCtrl.dismiss();
  };


  async login() {

    let loading = this.loadingCtrl.create({
      content: 'Espera...',
      spinner:'bubbles'
    });



    this.user = this.SignInForm.value;

		if (!this.user.email) {
			return;
		}

		let credentials = {
			email: this.user.email,
			password: this.user.password
    };
    try {
       loading.present();

       this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password).then((data)=>{

        this.nativeStorage.setItem('uid',data.user.uid).then(()=>{

          this.nav.setRoot(MainPage);

          loading.dismiss();

          console.log(data);
        })


       },
      err=>{
        loading.dismiss();
        console.log(typeof(err));

        switch (err.code){
          case "auth/wrong-password":
          this.presentToast("Contraseña Incorrecta");
          break;

          case "auth/user-not-found":
          this.presentToast("Usuario no encontrado");
          break;

          case "auth/user-disabled":
          this.presentToast("Usuario se encuentra inactivo");
          break;

        };
      });

    } catch (error) {
      loading.dismiss();
      console.log(error);
    }

  };

  presentToast(msj : string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  };

}
