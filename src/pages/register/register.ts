import { SignUpFormPage } from './../sign-up-form/sign-up-form';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { NativeStorage } from '@ionic-native/native-storage';


export interface user {
  name?: string,
  email: string;
  password: string;
  DOB:string;
}

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})



export class RegisterPage {
  public  SignUpForm: FormGroup;
  today:string = new Date().toISOString();
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder:FormBuilder,
              public viewCtrl: ViewController,
              private afAuth: AngularFireAuth,              
              public afs : AngularFirestore,
              private loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage, 
              private toastCtrl: ToastController,
              public nav: NavController) {

                let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
                this.SignUpForm = this.formBuilder.group({
                  name:["",Validators.required],
                  email:["",[Validators.required, Validators.pattern(emailPattern)]],
                  password:["",Validators.required],
                  DOB:["",Validators.required]
                }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  async register() {

    let user : user; 
    user = this.SignUpForm.value;
    let loading= this.loadingCtrl.create({
      content:"Registrando Usuario...",

    });          
    


    if(!user.email){
      return;
    }
    try {
      loading.present(); 
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(result =>{
        
        let email = user.email;
        let name = user.name;
        let dob = user.DOB;
        let uid = result.user.uid;
        let newUser = result.additionalUserInfo.isNewUser; 
        this.nativeStorage.setItem('uid',result.user.uid);
        
        
        this.afs.collection('users').doc(result.user.uid).set({email,name,uid,dob}).then(fsRes=>{

           
            if(newUser){
              this.nav.setRoot(SignUpFormPage); 
              loading.dismiss();
            }else{
              this.nav.setRoot(SignUpFormPage);
              loading.dismiss();
            }        
          
        
        },err =>{
          console.log(err);
          loading.dismiss();
          alert(err);
        })
        
      },
      err=>{
        loading.dismiss();
        switch(err.code){
          case "auth/email-already-in-use":
          this.presentToast("Este usuario ya existe.");
          break;
          case "auth/weak-password":
          this.presentToast("Contraseña debe tener  mas de 6 caracteres.");
          break;

        }
        console.log(err);
      }
    )
    } catch (error) {
      loading.dismiss();
      console.log(error);
    }
    
  }

  presentToast(msj : string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
