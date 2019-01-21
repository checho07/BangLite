import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public  SignInForm: FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder:FormBuilder,
              public viewCtrl: ViewController) {

                this.SignInForm = this.formBuilder.group({                 
                  user:["",Validators.required],                  
                  password:["",Validators.required]
                 
                }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
