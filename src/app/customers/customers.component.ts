import { Component } from '@angular/core';
import { ComputersService } from '../services/computers.service';
import { MatTableDataSource } from '@angular/material/table'
import { Computer } from '../model/computer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions'];

  constructor(private service: ComputersService) {
    this.loadData();
  }

  loadData() {
    this.service.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (er) => {
        alert('Ha ocurrido un error en la consulta de computadoras');
      },
    });
  }

  deleteComputer(item: Computer) {
    this.service.delteComputer(item.id).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => {
        alert('Algo salio mal al eliminar');
      },
    });
  }
}
