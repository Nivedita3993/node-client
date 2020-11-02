import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './content/reactive-form/reactive-form.component';
import { TodoComponent } from './content/todo/todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'form', component: ReactiveFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
