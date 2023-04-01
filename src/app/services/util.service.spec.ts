import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'removeItem');

    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token in localstorage', () => {

    service.isLogged.subscribe({
      next: (value) => {
        expect(value).toBeTrue();
      }
    })
    service.saveToken('token1234');
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token1234');
  });

  it('should be get token from localstorage', () => {
  service.getToken();
  expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should delete token from localstorage', () => {
    service.isLogged.subscribe({
      next: (value) => {
        expect(value).toBeFalse();
      }
    })
    service.deleteToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

});
