import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', ['getToken'])
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'login',
          redirectTo: ''
        }
      ])],
      providers: [
        { provide: UtilService, useValue: utilSvcSpy},
        { provide: Router, useValue: routerSpy},
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should canActivate user logged int', () => {
    utilSvcSpy.getToken.and.returnValue('token')
    const res = service.canActivate()
    expect(res).toBeTrue()
    expect(routerSpy.navigate).not.toHaveBeenCalled()
  });

  it('should canActivate user not logged int', () => {
    utilSvcSpy.getToken.and.returnValue(null)
    const res = service.canActivate()
    expect(res).toBeFalse()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'])
  });
});
