import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
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

  idea:any;
  titulo:any;
  private uid;
  public ideasReference: AngularFirestoreCollection<ideaInterface>;
  public ideasCollection:Observable<ideaInterface[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
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

    let loading = this.loadinCtrl.create(
      {
      content:"Guardando datos..."
      })
    loading.present();

    this.afst.collection('users')
      .doc(this.uid).collection('ideas')
        .add({titulo:this.titulo,idea:this.idea}).then(()=>{
          loading.dismiss();
          this.presentToast('Idea guardada.');
          this.idea = ''; this.titulo = '';
        },err =>{
          loading.dismiss();
          this.presentToast(err);

        }).catch(err=>{
          loading.dismiss();
          this.presentToast(err);
        });
   
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
