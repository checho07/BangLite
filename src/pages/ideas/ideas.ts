import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';



interface ideaInterface{
  titulo:string,
  idea:string
}

@Component({
  selector: 'page-ideas',
  templateUrl: 'ideas.html',
})
export class IdeasPage {
  'KHWRZY6YCTNXaKHkvAFKve1Fyuo1'
  idea:any;
  titulo:any;
  private uid;
  public ideasReference: AngularFirestoreCollection<ideaInterface>;
  public ideasCollection:Observable<ideaInterface[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              private afst: AngularFirestore,
              private nativeStorage: NativeStorage,
              private loadinCtrl : LoadingController,
              private toastCtrl: ToastController) {

                 this.nativeStorage.getItem('uid').then(res=>{
                   this.uid = res;
                   this.ideasReference = this.afst.collection('users').doc(this.uid).collection('ideas');
                  this.ideasCollection = this.ideasReference.valueChanges();
               })

  };

  ionViewDidLoad() {


  }

  addIdea(){

    if (this.titulo !== undefined && this.idea !== undefined) {
      let loading = this.loadinCtrl.create(
      {
      content:"Guardando datos...",
      spinner:'bubbles'
      })
    loading.present();

    this.afst.collection('users')
      .doc( this.uid).collection('ideas')
        .add({titulo:this.titulo,idea:this.idea}).then(()=>{
          loading.dismiss();
          this.presentToast('Idea guardada.');
          this.idea = ''; this.titulo = '';
          setTimeout(res=>{
            this.idea = undefined; this.titulo = undefined;
          },2000);
         
        },err =>{
          loading.dismiss();
          this.presentToast(err);

        }).catch(err=>{
          loading.dismiss();
          this.presentToast(err);
        });
    } else {
      this.presentToast('Escribe tu idea.')
    }
  };



  presentToast(msj : string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  showIdea(idea){
      this.alertCtrl.create({
      title: `<h1>` + idea.titulo+ `</h1>`,
      message:`<p>` + idea.idea+ `</p>`,
      cssClass:'alertClass',
      buttons: ['Cerrar']
    }).present();
  }


}
