import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cursoAxity';
  isLogged = false;

  constructor(private utilSvc: UtilService, private router: Router) {
    console.log(this.utilSvc.getToken())
    this.isLogged = Boolean(this.utilSvc.getToken());

    this.utilSvc.isLogged.subscribe({
      next: (value) => {
        this.isLogged = value;
      }
    })
  }

  logout() {
    this.utilSvc.deleteToken();
    this.router.navigate(['login']);
  }


}
