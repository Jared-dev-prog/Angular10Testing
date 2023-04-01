import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComputersService } from './computers.service';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputersService', () => {
  let service: ComputersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ComputersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();
      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (value) => {
          expect(value).toBeDefined();
          expect(value.length).toBe(1)
          const first = value[0]
          expect(first.id).toBe(1)
          expect(first.brand).toBe('HP')
          expect(first.model).toBe('Pavilion')
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers')
      expect(request.request.method).toBe('GET')

      request.flush([
        {
          id: 1,
          brand: 'HP',
          model: 'Pavilion'
        }
      ])
    }
  ));

  it('should http get error of computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();
      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('Computers not found')
        }
      });

      const request = httpMock.expectOne('http://localhost:3000/computers')
      expect(request.request.method).toBe('GET')

      request.flush(new ErrorEvent('Computers not found'))
    }
  ));

  it('should http post ok computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.saveComputer(computer);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (value) => {
          expect(value).toBeDefined();
        },
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers'
      );
      expect(requestMocked.request.method).toBe('POST');
      expect(requestMocked.request.body).toEqual(computer);
      requestMocked.flush({});
    }
  ));

  it('should http post error computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.saveComputer(computer);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error saving computer')
        }
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers'
      );
      expect(requestMocked.request.method).toBe('POST');
      expect(requestMocked.request.body).toEqual(computer);
      requestMocked.error(new ErrorEvent('error saving computer'))
    }
  ));

  it('should http put ok computer update', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.updateComputer(computer.id, computer);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (value) => {
          expect(value).toBeDefined();
        },
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers/' + computer.id
      );
      expect(requestMocked.request.method).toBe('PUT');
      expect(requestMocked.request.body).toEqual(computer);
      requestMocked.flush({});
    }
  ));

  it('should http put ok computer update with error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.updateComputer(computer.id, computer);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error update computer')
        }
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers/' + computer.id
      );
      expect(requestMocked.request.method).toBe('PUT');
      expect(requestMocked.request.body).toEqual(computer);
      requestMocked.error(new ErrorEvent('error update computer'))
    }
  ));

  it('should http delete ok computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.delteComputer(computer.id);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (value) => {
          expect(value).toBeDefined();
        },
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers/' + computer.id
      );
      expect(requestMocked.request.method).toBe('DELETE');
      requestMocked.flush({});
    }
  ));
  it('should http delete error computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.delteComputer(computer.id);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        error: (value) => {
          expect(value.error.type).toBe('computer not deleted');
        },
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers/' + computer.id
      );
      expect(requestMocked.request.method).toBe('DELETE');
      requestMocked.error(new ErrorEvent('computer not deleted'));
    }
  ));

  it('should http get by id ok computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.getComputer(computer.id);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (value) => {
          console.log('Get by id', value);
          expect(value).toBeDefined();
          let computerResponse = value as Computer;
          expect(computerResponse.id).toBe(1);
          expect(computerResponse.model).toBe('Pavilon');
          expect(computerResponse.brand).toBe('HP');
        },
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers/' + computer.id
      );
      expect(requestMocked.request.method).toBe('GET');
      requestMocked.flush({
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      });
    }
  ));
  it('should http get by id error computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const computer = {
        id: 1,
        brand: 'HP',
        model: 'Pavilon',
      } as Computer;
      const obs = service.getComputer(computer.id);

      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        error: (value) => {
          expect(value.error.type).toBe('computer not found');
        },
      });

      const requestMocked = httpMock.expectOne(
        'http://localhost:3000/computers/' + computer.id
      );
      expect(requestMocked.request.method).toBe('GET');
      requestMocked.error(new ErrorEvent('computer not found'));
    }
  ));

});
