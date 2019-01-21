import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Select } from 'ionic-angular';
import { NgSwitchCase } from '@angular/common';
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
  public  SignUpForm: FormGroup;
  public programasPresencial:any[];
  public programasVirtual:any[];
  public programasDistancia:any[];
  public modSelected:number ;
   modDisabled:boolean = true;
   proDisabled:boolean = true;
   nivDisabled:boolean = true;
   redDisabled:boolean = true;
   btnDisabled:boolean = true;
   
  constructor(public navCtrl: NavController,private formBuilder:FormBuilder, public navParams: NavParams) {
  
    this.SignUpForm = this.formBuilder.group({
      name:["",Validators.required],
      user:["",Validators.required],
      password:["",Validators.required],
      DOB:["",Validators.required]
    }); 


};

  ionViewDidLoad() {
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
  }



}
