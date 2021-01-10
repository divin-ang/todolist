import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import {RecognitionService} from '../recognition.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
 
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
    
    public visible : String="tous";
    public text =""; //resultat de la reconnaissance vocale
    private isStart = false;
    
    constructor(private todoService: TodoService, private recognition :RecognitionService){
      
        todoService.getTodoListDataObservable().subscribe( 
            tdl => {
                this.todoList = tdl;
               
            });

            this.recognition.init() //intiatilisation du du service reconnaissance vocale
            
     
  
    }

    ngOnInit() {
        
    }
 
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }
    // ajout d'un item
    appendItem(label: string, isDone: boolean = false){
        if(label !=""){
            this.todoService.appendItems({
                label,
                isDone:isDone,
               
            });

        }
    
   
      
    }

   // affiche le nombre d'item restant et organise l'affichage des fonctionnalites
    nombre(){
        
       let longeur = this.todoList.items.length - this.todoList.items.filter(I =>I.isDone==true).length;
       if(this.todoList.items.length!=0){
           document.getElementById("tous").style.display="inline"
           document.getElementById("supprimer-tout").style.display="inline"
           document.getElementById("restant").style.display="inline"
           
       }else{
        document.getElementById("tous").style.display="none"
        document.getElementById("supprimer-tout").style.display="none"
        document.getElementById("restant").style.display="none"
       }
       if(this.todoList.items.filter(I =>I.isDone==true).length!=0){
        document.getElementById("complet").style.display="inline"
        document.getElementById("coche").style.display="inline"
       }else{
        document.getElementById("complet").style.display="none"
        document.getElementById("coche").style.display="none"

       }
       if(longeur!=0){
        document.getElementById("actifs").style.display="inline"
       }else{
        document.getElementById("actifs").style.display="none"

       }
       
          
        return longeur;
    }
    //suppression des item
    removeItems(){
        this.todoList.items.forEach(item=>{
          if(item.isDone){
            this.todoService.removeItems(item);
          }
        });
    
       
    
      }
      // permet supprimer tous les items
      effacerTout(){
        this.todoList.items.forEach(item=>{
            
              this.todoService.removeItems(item);
        })
       
      }
  // permet de supprimer les items qui sont coches
    tousSelect(){
    
    
    let  tousSelectionne = this.items.every(x => x.isDone);
        this.todoList.items.forEach(x => 
            {if(tousSelectionne){
                this.todoService.setItemsDone(x.isDone = true);
            }
            else{
                this.todoService.setItemsDone(x.isDone = false);
            }
            });
    }
    // cette methode gere l'affichage des items en fonction du bouton clique
    estVisible(item){
        //si clique sur tous
        if(this.visible==='tous'){

          return true;
        }
        // si clique sur actif
        if(this.visible==='actif' && !item.isDone){
          return true;
        }
        // si clique sur complet
    
        if(this.visible==='complet' && item.isDone){
          return true;
        }
    
        return false;
      }
    
      setVisible(value){
        this.visible = value;
      }
    // lance la reconnaissance vocale
    start(){
        this.recognition.start()
        this.isStart=true;
        
    }
    // arret de l'arreconnaissance vocale et ajout de l'item reconnu 
    stop(){
        this.recognition.stop() 
        this.text=this.recognition.text
        if(this.text.length>1){
           
            this.appendItem(this.text,false)
        }
       
         this.text=""
         this.isStart=false;
          
        
       
        
    }
    // permet d'excuter la methode stop et start en cliquand sur la meme icone de micro
    gestionVoice(){
        this.isStart?this.stop():this.start()
    }
    
  
}