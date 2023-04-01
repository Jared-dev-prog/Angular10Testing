import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-new-computer',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.css']
})
export class NewComputerComponent {
  formComputer?: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ComputersService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
    });
  }

  saveComputer() {
    let data = this.formComputer?.value;
    this.service.saveComputer(data).subscribe({
      next: () => {
        this.router.navigate(['customers']);
      },
      error: () => {
        alert('Ocurrió un error al insertar');
      },
    });
  }
}
