
import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

 recon =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text:string = '';
  public tempWords:string='';

  constructor() { }

  init() {
      this.text=""

    this.recon.interimResults = true;
    this.recon.lang = 'fr-Fr';

    this.recon.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
      this.text=""
    this.isStoppedSpeechRecog = false;
    this.recon.start();
    console.log("Speech recognition started")
    this.recon.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recon.stop();
        console.log("End speech recognition")
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
    console.log("End speech recognition")
  }

 concatenation() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }
}