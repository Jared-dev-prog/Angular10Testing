import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { EditComputerComponent } from './edit-computer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputersService } from 'src/app/services/computers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;
  let computerServiceSpy = jasmine.createSpyObj<ComputersService>(
    'ComputerService',
    ['updateComputer', 'getComputer']
  );
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  let activatedRouterSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    ['params']
  );

  activatedRouterSpy.params = NEVER;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'computers',
            redirectTo: '',
          },
        ]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputersService, useValue: computerServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouterSpy },

        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const params = { id: 1 };
    activatedRouterSpy;

    component.initData();
  });

  it('should load data', () => {
    let mockResponse = {
      id: 1,
      brand: 'Lenovo',
      model: '123ASD',
    } as Computer;
    computerServiceSpy.getComputer.and.returnValue(of(mockResponse));
    component.loadData();
    expect(computerServiceSpy.getComputer).toHaveBeenCalled();
  });
  it('should load data - error', () => {
    let mockResponse = {
      id: 1,
      brand: 'Lenovo',
      model: '123ASD',
    } as Computer;
    computerServiceSpy.getComputer.and.returnValue(
      throwError(() => {
        'computer not found';
      })
    );
    component.loadData();
    expect(component.onError).toBeTrue();
  });
  it('should update data', () => {
    let mockResponse = {
      id: 1,
      brand: 'Lenovo',
      model: '123ASD',
    } as Computer;
    computerServiceSpy.updateComputer.and.returnValue(of(mockResponse));
    component.updateComputer();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['computers']);
  });
  it('should update data - error', () => {
    let mockResponse = {
      id: 1,
      brand: 'Lenovo',
      model: '123ASD',
    } as Computer;
    computerServiceSpy.updateComputer.and.returnValue(
      throwError(() => {
        'user not found';
      })
    );
    component.updateComputer();
    expect(component.onError).toBeTrue();
  });
});