import { Component, OnInit } from '@angular/core';
import {Todo} from '../../interfaces/todo'
import {trigger,animation,transition,style,animate} from '@angular/animations';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  animations:[
    trigger('fade',[
      transition(':enter',
      [
        style({opacity:0,transform:'translateY(30px)'}),
        animate(400,style({opacity:1,transform:'translateY(0px)'}))
      ]),
      transition(':leave',
      [
        animate(400,style({opacity:0,transform:'translate(30px)'}))
      ])
    ])
  ]
})
export class TodolistComponent implements OnInit {
 todos: Todo[];
 todoTitle:string;
 idForTodo:number;
 beforeeditcache:string;
 filter:string;
  constructor() { }

  ngOnInit() {
    this.filter='all';
    this.beforeeditcache='';
    this.idForTodo=3;
    this.todoTitle='';
    this.todos=[
      {
        "id":1,
        "title":"First Angular",
        "completed": false,
        "editing":false,
      },
      {
        "id":2,
        "title":"Second Angular",
        "completed": false,
        "editing":false,
      },
    ];
  }
  addTodo():void
  {
    if(this.todoTitle.trim().length==0){
      return;
    }
    this.todos.push({
      id:this.idForTodo,
      title:this.todoTitle,
      completed:false,
      editing:false
    })
    this.todoTitle='';
    this.idForTodo++;
  }
  editTodo(todo:Todo):void{
    this.beforeeditcache=todo.title;
    todo.editing=true;
    
  }
  deleteTodo(id:number):void{
    this.todos=this.todos.filter(todo => todo.id !== id);
  }
  doneedit(todo:Todo):void{
    if(todo.title.trim().length==0)
    {
      todo.title=this.beforeeditcache;
    }
    todo.editing=false;
  }
  canceledit(todo:Todo):void{
    todo.title=this.beforeeditcache;
    todo.editing=false;
  }
  completed():number{
    return this.todos.filter(todo => todo.completed).length;
  }
  remaining():number{
    return this.todos.filter(todo=>!todo.completed).length;
  }
  atleastonecompleted():boolean{
    return this.todos.filter(todo=>todo.completed).length>0;
  }
  clearcompleted():void{
    this.todos=this.todos.filter(todo=>!todo.completed);
  }
  checkalltodos():void{
    this.todos.forEach(todo=>todo.completed=(<HTMLInputElement>event.target).checked);
  }
  todosfiltered():Todo[]
  {
    if(this.filter=='all')
    {
      return this.todos;
    }
    else if(this.filter=='active')
    {
      return this.todos.filter(todo=>!todo.completed)
    }
    else if(this.filter=='completed')
    {
      return this.todos.filter(todo=>todo.completed)
    }
    return this.todos;
  }
}
