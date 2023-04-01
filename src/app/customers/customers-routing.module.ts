import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { EditComputerComponent } from './edit-computer/edit-computer.component';
import { NewComputerComponent } from './new-computer/new-computer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'new',
    component: NewComputerComponent
  },
  {
    path: 'edit/:id',
    component: EditComputerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
