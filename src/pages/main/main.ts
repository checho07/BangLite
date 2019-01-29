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
  public cardTextCollection:any[];
  random:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs : AngularFireAuth,
              ) {

                this.cardTextCollection =
                [
                'Singapur.','Busca un libro y lee su primer párrafo. ','Desordénalo todo.  ',
                '¿Cómo resolvería el reto Richard Branson?','Piensa como Jack Ma. ','¿Qué haría tu mejor amigo? ',
                'Juega el juego. ','Haz cosas imperfectas. ','Déjà vu.','Nunca ponga los huevos en una sola cesta.',
                'Haz una lista de diez cosas que podrías hacer y haz lo último en la lista.','Elimina.',
                'Encuéntrele la comba al palo.','Una sencilla solución, dos difíciles soluciones.',
                'Piensa como Walt Disney.','Cambia de roles. ','Japón.','Todo bombero no desea otra cosa en la vida más que ser bombero.',
                'Toma un descanso. ','La idea no es un motivo.','Piensa como un lobo. ','Mira los dos lados, el oscuro y el claro.',
                'Combina lo incombinable. ','Corta una conexión.','Elimina, Reduce, Incrementa y crea. ',
                'Ni a Dios lo que es de Dios, ni al César lo que es del César.','Observa de cerca los detalles más vergonzosos y amplíalos.',
                'Sé aburrido.','Adapta.','Quita las partes importantes. ','No hay reglas.','Piensa cosas imposibles de hacer.',
                'Cambia de roles.','¡Rómpalo!','Haz trocitos y después júntalos.','¿Qué soñaste ayer?','Cuantas manos y cabezas sean necesarias. ',
                'Modifica.','Duro como una roca, flexible como…','El cielo es un vecindario. ','Como en casa.','Devuélvete.','Nado en un submarino largas distancias. ',
                'Humanice cualquier cosa.','Empieza por un garaje. ','¿Qué pasaría si…?','Pon otros usos. ','Dale un vuelco a tu rutina. ','Lego.','Apórtele valor de verdad.'
                 ]


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
   
    this.random =  Math.floor((Math.random() * 49) + 1)

    document.getElementById("containerBag").classList.remove('restartContainer','animateds');
      // document.getElementById("containerBag").classList.remove('restartContainer');
     document.getElementById("containerBag").classList.add('animateds');

      document.getElementById('bag').classList.remove('fadeIn');
      document.getElementById('bag').classList.add('fadeOut');
      document.getElementById('cardMain').classList.remove('fadeOut');
      document.getElementById('cardMain').classList.add('fadeIn');
      document.getElementById('hand').classList.remove('fadeIn');
      document.getElementById('hand').classList.add('fadeOut');
   
  };

  stop() {
    this.anim.pause();
}

  showReverse(){
    document.getElementById('cardMain').classList.remove('fadeIn');
    document.getElementById('cardMain').classList.add('fadeOut');
    document.getElementById('textCard').classList.remove('fadeOut');
    document.getElementById('textCard').classList.add('fadeIn');

    setTimeout(function(){
      document.getElementById('cardReverse').classList.add('fadeIn');


    },300);

  }

  restart(){
    document.getElementById('cardReverse').classList.remove('fadeIn');
    document.getElementById('cardReverse').classList.add('fadeOut');
    document.getElementById('textCard').classList.remove('fadeIn');
    document.getElementById('textCard').classList.add('fadeOut');

      document.getElementById('containerBag').classList.remove('animateds');
      document.getElementById('containerBag').classList.add('restartContainer');
      document.getElementById('bag').classList.remove('fadeOut');
      document.getElementById('bag').classList.add('fadeIn');
      document.getElementById('hand').classList.remove('fadeOut');
      document.getElementById('hand').classList.add('fadeIn');



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


  ionViewDidEnter(){



  }



}
