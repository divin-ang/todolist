import {Component, OnInit,Input,ViewChild,ElementRef} from '@angular/core';
import { TodoItemData } from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() private item: TodoItemData;
  @ViewChild("newTextInput", { static: false }) private inputLabel: ElementRef;

   constructor(private todoService: TodoService) {

    
    }

  ngOnInit() {
  }
  get label(): string {
    return this.item.label;
  }

  set label(lab: string) {
    this.todoService.setItemsLabel(lab, this.item);
  }
  get isDone(): boolean {
    return this.item.isDone;
  }
  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone(done, item);
  }

  itemDelete() {
    this.todoService.removeItems(this.item);
  }

}
