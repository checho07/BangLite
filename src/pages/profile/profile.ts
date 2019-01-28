import { Observable } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from './../home/home';
import { LoginPage, user } from './../login/login';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
// import { ProfileData } from '../../providers/profile-data';
// import { AuthData } from '../../providers/auth-data';

// import { Camera, CameraOptions } from '@ionic-native/camera';

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

                let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
                this.SignUpForm = this.formBuilder.group({
                  name:["",Validators.required],                  
                  DOB:['',Validators.required]
                });  
               
                this.nativeStorage.getItem('uid').then(res=>{
                  this.uid = res;
                  this.afs.collection('users').doc(this.uid).valueChanges().subscribe(res=>{
                    this.accountInfo.name = res['name'];
                    this.accountInfo.email = res['email'];
                    this.accountInfo.DOB = res['dob'];     
                   });
                     
                  this.afs.collection('users').doc(this.uid).collection('formulario').doc(this.uid).valueChanges().subscribe(res=>{
                   this.formulario.genero = res['genero'];
                   this.formulario.modalidad = res['modalidad'];                    
                   this.formulario.nivel = res['nivel'];   
                   this.formulario.programa = res['programa'];   
                   this.formulario.publicidad = res['publicidad'];                      
                   this.formulario.uid = res['uid']; 
                   
                     });
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
      "Ingeniería de Sistemas",
      "Administración Pública",
      "Administración de Empresas Agroindustriales",
      "Dirección y Producción de Medios Audiovisuales"    
    ];

    this.programasPresencial = [
      "Ingeniería de Sistemas",
      "Ingeniería Electrónica",
      "Administración de Servicios de Salud",
      "Administración de la Seguridad Social",
      "Administración Turística y Hotelera",
      "Contaduría Pública",
      "Negocios Internacionales",
      "Administración de Empresas",
      "Dirección y Producción de Medios Audiovisuales",
      "Diseño Gráfico",
      "Diseño de Modas",
      "Comunicación Social"    
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
      content:"Registrando Usuario...",

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
      content:"Actualizando datos..."
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