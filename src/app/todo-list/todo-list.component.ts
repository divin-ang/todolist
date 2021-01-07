import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
 
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
    
    public position: number;
    public visible : String="tous";
    
    constructor(private todoService: TodoService){
      
        todoService.getTodoListDataObservable().subscribe( 
            tdl => {
                this.todoList = tdl;
               
            });
     
       
    }

    ngOnInit() {
       
    }
 
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }
 
    appendItem(label: string, isDone: boolean = false){
        if(label !== ""){
            this.todoService.appendItems({
                label,
                isDone:isDone,
               
            });

        }
    
   
      
    }

   
    nombre(){
       let longeur = this.todoList.items.length - this.todoList.items.filter(I =>I.isDone==true).length;
        return longeur;
    }
    removeItems(){
        this.todoList.items.forEach(item=>{
          if(item.isDone){
            this.todoService.removeItems(item);
          }
        });
    
       
    
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

  
    
  
}