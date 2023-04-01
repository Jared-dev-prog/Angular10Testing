import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/login.model';
import { LoginService } from '../services/login.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginSvc: LoginService,
    private router: Router,
    private utilSvc: UtilService,
    ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  loginClick() {
    this.isLoading = true;
    const req = this.formLogin?.value as LoginRequest;
    this.loginSvc.login(req).subscribe({
      next: (response: any) => {
        this.utilSvc.saveToken(response.token)
        this.router.navigate(['home']);
      },
      error: (error: any) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
