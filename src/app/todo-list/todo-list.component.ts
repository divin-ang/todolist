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
    
    public pos: number;
    
    public visible : String="tous";
    public text ="";
    private isStart = false;
    
    constructor(private todoService: TodoService, private recognition :RecognitionService){
      
        todoService.getTodoListDataObservable().subscribe( 
            tdl => {
                this.todoList = tdl;
               
            });

            this.recognition.init()
            
     
  
    }

    ngOnInit() {
        this.text=''
    }
 
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }
 
    appendItem(label: string, isDone: boolean = false){
        if(label !=""){
            this.todoService.appendItems({
                label,
                isDone:isDone,
               
            });

        }
    
   
      
    }

   
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
    removeItems(){
        this.todoList.items.forEach(item=>{
          if(item.isDone){
            this.todoService.removeItems(item);
          }
        });
    
       
    
      }
      effacerTout(){
        this.todoList.items.forEach(item=>{
            
              this.todoService.removeItems(item);
        })
       
      }

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
    estVisible(item){
        if(this.visible==='tous'){
          return true;
        }
        
        if(this.visible==='actif' && !item.isDone){
          return true;
        }
    
        if(this.visible==='complet' && item.isDone){
          return true;
        }
    
        return false;
      }
      setVisible(value){
        this.visible = value;
      }

    start(){
        this.recognition.start()
        this.isStart=true;
        
    }
    stop(){
        this.recognition.stop() 
        this.text=this.recognition.text
        if(this.text.length>1){
           
            this.appendItem(this.text,false)
        }
       
         this.text=""
         this.isStart=false;
          
        
       
        
    }
    gestionVoice(){
        this.isStart?this.stop():this.start()
    }
    
  
}