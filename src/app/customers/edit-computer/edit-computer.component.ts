import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent {
  computerId = 0;
  onError = false;
  callOnInit = 0;
  myroute = '';
  formComputerEdit?: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ComputersService,
    private router: Router
  ) {
    this.formComputerEdit = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
    });

    this.initData();
  }

  initData() {
    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.loadData();
        this.callOnInit = 1;
      },
    });
  }
  loadData() {
    this.service.getComputer(Number(this.computerId)).subscribe({
      next: (computer: Computer) => {
        this.formComputerEdit?.patchValue(computer);
      },
      error: (err) => {
        this.onError = true;

        alert('Hubo un error!!!');
      },
    });
  }
  updateComputer() {
    let dataToUpdate = this.formComputerEdit?.value;
    this.service.updateComputer(this.computerId, dataToUpdate).subscribe({
      next: () => {
        this.router.navigate(['computers']);
      },
      error: (err) => {
        this.onError = true;
        alert('Error al actualizar!!!');
      },
    });
  }
}
