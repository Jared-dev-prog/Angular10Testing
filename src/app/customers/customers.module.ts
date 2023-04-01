import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import {MatTableModule} from '@angular/material/table';
import { NewComputerComponent } from './new-computer/new-computer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { EditComputerComponent } from './edit-computer/edit-computer.component';


@NgModule({
  declarations: [
    CustomersComponent,
    NewComputerComponent,
    EditComputerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CustomersModule { }
