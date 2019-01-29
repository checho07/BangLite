import { MainPage } from './../main/main';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Select, ToastController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { NativeStorage } from '@ionic-native/native-storage';
import { TutorialPage } from '../tutorial/tutorial';
/**
 * Generated class for the SignUpFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up-form',
  templateUrl: 'sign-up-form.html',
})
export class SignUpFormPage {




  public programasPresencial:any[];
  public programasVirtual:any[];
  public programasDistancia:any[];
  public modSelected:number ;
   modDisabled:boolean = true;
   proDisabled:boolean = true;
   nivDisabled:boolean = true;
   redDisabled:boolean = true;
   btnDisabled:boolean = true;
   formulario = {genero:'',modalidad:'',programa:'',nivel:'',publicidad:'',uid:''};

  constructor(public navCtrl: NavController,
              private afst: AngularFirestore,
              private formBuilder:FormBuilder,
              private nativeStorage: NativeStorage,
              public navParams: NavParams,
              private toastCtrl: ToastController,
               private loadinCtrl : LoadingController) {



    this.nativeStorage.getItem('uid').then(res=>
      {
        this.formulario.uid = res;
      });

};


  ionViewDidLoad() {
    this.programasDistancia = [
      "Administración de Empresas",
      "Administración de Empresas Agroindustriales"
    ];

    this.programasVirtual = [
      'Administración de Empresas Agroindustriales',
      'Administración Pública',
      'Dirección y Producción de Medios Audiovisuales',
      'Ingeniería de Sistemas'
    ];

    this.programasPresencial = [
  '    Administración de Empresas',
      'Administración de la Seguridad Social',
      'Administración de Servicios de Salud',
      'Administración Turística y Hotelera',
      'Comunicación Social',
      'Contaduría Pública',
'      Dirección y Producción de Medios Audiovisuales',
      'Diseño de Modas',
      'Diseño Gráfico',
      'Ingeniería de Sistemas',
      'Ingeniería Electrónica',
      'Negocios Internacionales '
    ];

  };


  ableFn(number){
    switch(number){
      case 1:this.modDisabled = false;
      break;
      case 2:this.proDisabled = false;
      break;
      case 3:this.nivDisabled = false ;
      break;
      case 4:this.redDisabled = false ;
      break;
      case 5:this.btnDisabled = false ;
      break;
    }
  };


  testfn(event){

    this.ableFn(2);

    console.log(event)
    switch(event){
      case 'Presencial':
      this.modSelected = 1;
      break;
      case 'Distancia':
      this.modSelected = 2;
      break;
      case 'Virtual':
      this.modSelected = 3;
      break;
      default:
      this.modSelected = 0;
    }
    console.log(this.modSelected)
  };

  saveForm(){

    let loading = this.loadinCtrl.create(
      {
      content:"Guardando datos...",
      spinner:'bubbles'
      })
    loading.present();

    this.afst.collection('users').doc(this.formulario.uid).collection('formulario').doc(this.formulario.uid).set(this.formulario).then(result=>
      {
      console.log(result);
      loading.dismiss();
      this.navCtrl.setRoot(TutorialPage);
      this.presentToast("Datos Guardados.");

      })

  };
  presentToast(msj : string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }



}
