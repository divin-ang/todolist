
import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
// service reconnaissance vocale
export class RecognitionService {

 recon =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text:string = '';
  public tempWords:string='';

  constructor() { }

  init() {
      this.text=""// va stocker le resulat 

    this.recon.interimResults = true;
    this.recon.lang = 'fr-Fr'; // va reconnaitre le francais de france

    this.recon.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log("j'ai reconnu "+transcript);
    });
  }
// lance la reconnaisance
  start() {
      this.text=""
    this.isStoppedSpeechRecog = false;
    this.recon.start();
    
    this.recon.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recon.stop();
        
      } else {
        this.concatenation()
        this.recon.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.concatenation()
    this.recon.stop();
   
  }
 // ajoute au resultat chaque mot reconnu
 concatenation() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }
}