import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { IdeasPage } from '../ideas/ideas';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public lottieConfig: Object;
  private anim: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afs : AngularFireAuth,
              ) {
   

    this.lottieConfig = {
      path: 'assets/hand.json',
      autoplay: true,
      loop: true
  };
  }
  handleAnimation(anim: any) {
    this.anim = anim;
    
    console.log(anim)
}
clicker(){
  this.scrollBack();
}
  scrollBack(){
    setTimeout( function() {
      document.getElementById("containerBag").classList.remove('restartContainer');
      document.getElementById("containerBag").classList.add("animateds"); 
      document.getElementById('bag').classList.remove('fadeIn');    
      document.getElementById('bag').classList.add('fadeOut');
      document.getElementById('cardMain').classList.remove('fadeOut');
      document.getElementById('cardMain').classList.add('fadeIn'); 
      document.getElementById('hand').classList.remove('fadeIn');
      document.getElementById('hand').classList.add('fadeOut');       
    })
  };

  stop() {
    this.anim.pause();
}

  showReverse(){
    document.getElementById('cardMain').classList.remove('fadeIn');
    document.getElementById('cardMain').classList.add('fadeOut');
    setTimeout(function(){
      document.getElementById('cardReverse').classList.add('fadeIn');
    },300);   
  
  } 

  restart(){
    document.getElementById('cardReverse').classList.remove('fadeIn');
    document.getElementById('cardReverse').classList.add('fadeOut');
  
      document.getElementById('containerBag').classList.remove('animateds');
      document.getElementById('containerBag').classList.add('restartContainer');
      document.getElementById('bag').classList.remove('fadeOut');
      document.getElementById('bag').classList.add('fadeIn');
      document.getElementById('hand').classList.remove('fadeOut');
      document.getElementById('hand').classList.add('fadeIn');    
    
   
  
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad MainPage');
  }

  logOut(){
    this.afs.auth.signOut().then(()=>{  
      this.navCtrl.setRoot(HomePage);
    })
  };

  ideas(){
    this.navCtrl.push(IdeasPage);
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }



}
