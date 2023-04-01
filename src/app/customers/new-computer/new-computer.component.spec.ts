import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputersService } from 'src/app/services/computers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Computer } from 'src/app/model/computer.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputersService>('service', ['saveComputer'])
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComputerComponent ],
      imports: [ MatInputModule, MatButtonModule, ReactiveFormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'computers',
            redirectTo: '',
          },
        ]),

      ],
      providers: [
        { provide: ComputersService, useValue: computerSvcSpy},
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save computer', () => {
    let mockResponse = {
      brand: 'HPP',
      model: '12XDF43',
    } as Computer;
    computerSvcSpy.saveComputer.and.returnValue(of(mockResponse));
    component.formComputer?.patchValue(mockResponse);
    component.saveComputer();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['customers']);
  });
  it('should save computer - error ', () => {
    computerSvcSpy.saveComputer.and.returnValue(
      throwError(() => {
        'user not found';
      })
    );
    component.saveComputer();
    expect(computerSvcSpy.saveComputer).toHaveBeenCalled();
  });
});
