
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  user } from './../login/login';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';


export interface user2 {
  name?: string,
  DOB:string;
  email:string;
}
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public userP: any;
  public programasPresencial:any[];
  public programasVirtual:any[];
  public programasDistancia:any[];
  public profileP:any;
  public  SignUpForm: FormGroup;
  public accountInfo:any = {name:'',DOB:'',email:''};
  public infoReference:user;
  private uid:any;
  public modSelected:number ;
  segment:string = "cuenta";
  today:string = new Date().toISOString();
  formulario = {genero:'',modalidad:'',programa:'',nivel:'',publicidad:'',uid:''};



  constructor(public navCtrl: NavController,
               public alertCtrl: AlertController,
               public afs : AngularFirestore,
               private formBuilder:FormBuilder,
               private nativeStorage: NativeStorage,
               private loadingCtrl: LoadingController,
               private toastCtrl: ToastController,
               public nav: NavController) {

                
                this.SignUpForm = this.formBuilder.group({
                  name:["",Validators.required],
                  DOB:['',Validators.required]
                });

                this.nativeStorage.getItem('uid').then(res=>{

                  this.uid = res;

                  let loading= this.loadingCtrl.create({
                    content:"Actualizando Usuario...",
                    spinner:'bubbles'

                  });
                  this.afs.collection('users').doc(this.uid).valueChanges().subscribe(res=>{
                    this.accountInfo.name = res['name'];
                    this.accountInfo.email = res['email'];
                    this.accountInfo.DOB = res['dob'];
                    loading.dismiss();
                   },err =>{
                     loading.dismiss();
                     this.presentToast(err);
                   });

                  this.afs.collection('users').doc(this.uid).collection('formulario').doc(this.uid).valueChanges().subscribe(res=>{
                   this.formulario.genero = res['genero'];
                   this.formulario.modalidad = res['modalidad'];
                   this.formulario.nivel = res['nivel'];
                   this.formulario.programa = res['programa'];
                   this.formulario.publicidad = res['publicidad'];
                   this.formulario.uid = res['uid'];

                     },err =>{
                       loading.dismiss();
                       this.presentToast(err)

                    });
                },err =>{
                  this.presentToast(err);
                })




                // this.nativeStorage.getItem('uid').then(res=>{
                //   this.uid = res;
                //   this.accountInfo = this.afs.collection('users').doc('KHWRZY6YCTNXaKHkvAFve1Fyuo1').valueChanges().subscribe(resInfo=>{
                //     this.accountInfo = resInfo;
                //     alert(JSON.stringify( this.accountInfo));
                //   })
                // })




  }

  ionViewWillEnter(){

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

  }



  takePicture() {
      // this.camera.getPicture({
      //     quality: 95,
      //     destinationType: this.camera.DestinationType.DATA_URL,
      //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //     allowEdit: true,
      //     encodingType: this.camera.EncodingType.PNG,
      //     targetWidth: 100,
      //     targetHeight: 100,
      //     saveToPhotoAlbum: true
      // }).then(imageData => {
      //     this.profileP = imageData;
      //     imageData = null;

      // }, error => {
      //     console.log("ERROR -> " + JSON.stringify(error));
      // });
  }

  updateP() {

      // this.profileData.updatePic(this.profileP);
  }


  async register() {

    let user : user2;
    user = this.SignUpForm.value;
    let loading= this.loadingCtrl.create({
      content:"Actualizando Usuario...",
      spinner:'bubbles'

    });
    try {
      loading.present();



        this.afs.collection('users')
        .doc(this.uid).update({name:user.name,dob:user.DOB}).then(fsRes=>{


              loading.dismiss();
              this.presentToast("Datos actualizados.");


        },err =>{
          console.log(err);
          loading.dismiss();
          alert(err);
        })

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
  };

  saveForm(){

    let loading = this.loadingCtrl.create(
      {
      content:"Actualizando datos...",
      spinner:'bubbles'
      })
    loading.present();

    this.afs.collection('users').doc(this.uid).collection('formulario').doc(this.uid).set(this.formulario).then(result=>
      {
      console.log(result);
      loading.dismiss();
      this.presentToast("Datos actualizados.");

      })

  };

}
