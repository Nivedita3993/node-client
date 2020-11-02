import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  @ViewChild("newTask") newTask: ElementRef;
  unfinshedTask: Array<Todo> = [];
  completedTask: Array<Todo> = [];
  addTask: Todo;

  constructor(
    private service: TodoService
  ) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask(): void {
    this.service.loadAllList().subscribe((data) => {
      if (!data) {
        return;
      }

      data.forEach(element => {
        if (element.isComplete) {
          this.completedTask.push(element);
        } else {
          this.unfinshedTask.push(element);
        }
      });
    });
  }

  addNewtask() {
    if (!this.newTask.nativeElement.value.length) {
      return;
    }

    this.addTask = new Todo();
    this.addTask.title = this.newTask.nativeElement.value;
    this.service.addNewTask(this.addTask).subscribe(data => {
      if (!data) {
        return;
      }
      this.newTask.nativeElement.value = '';
      this.unfinshedTask.unshift(data);
    });
  }

  trackByItems(index: number, item: Todo): string {
    return item.id;
  }

  update(task: Todo): void {
    this.service.update(task).subscribe(data => {
      console.log(data);
      if (!data) {
        return
      }

      let index: number;
      if (task.isComplete) {
        index = this.unfinshedTask.findIndex(ele => ele.id === task.id);

        this.completedTask.unshift(task);
        this.unfinshedTask.splice(index, 1);

      } else {
        index = this.completedTask.findIndex(ele => ele.id === task.id);

        this.unfinshedTask.unshift(task);
        this.completedTask.splice(index, 1);
      }
    });
  }

  markAsUnFinshed(cTask: Todo): void {
    cTask.isComplete = false;

    this.update(cTask);
  }

  deleteTask(task: Todo): void {
    this.service.deleteTask(task.id).subscribe(data => {
      if(!data) {
        return;
      }

      let index: number;
      if (task.isComplete) {
        index = this.completedTask.findIndex(ele => ele.id === task.id);

        this.completedTask.splice(index, 1);

      } else {
        index = this.unfinshedTask.findIndex(ele => ele.id === task.id);

        this.unfinshedTask.splice(index, 1);
      }

    });
  }

  markAllAsComplete(): void {
    this.service.markAllComplete().subscribe(data => {
      if(!data) {
        return;
      }

      this.unfinshedTask.forEach(ele => {
        ele.isComplete = true;
        this.completedTask.unshift(ele);
      });

      this.unfinshedTask = [];
    });
  }

  deleteAll(): void {
    this.service.deleteAll().subscribe(data => {
      if(!data){
        return;
      }

      this.unfinshedTask = [];
      this.completedTask = [];
    });
  }
}
