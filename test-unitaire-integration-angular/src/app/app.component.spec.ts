import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError, EMPTY } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let http: HttpClient;
  let todoService: TodoService;
  beforeEach(async () => {
  await TestBed.configureTestingModule({
   declarations: [ AppComponent ],
   imports: [ReactiveFormsModule, HttpClientTestingModule],
   providers: [
   TodoService
   // {provide: TodoService, useValue: new TodoService(http)}
   ],
   schemas: [NO_ERRORS_SCHEMA]
   })
   .compileComponents();
  todoService = TestBed.get(TodoService);
  });

  beforeEach(() => {
   fixture = TestBed.createComponent(AppComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });

  it('should service be created', () => {
   expect(todoService).toBeTruthy();
  });

  // compute function
  it('Should be 0', () => {
   const value = component.compute(-3);
   expect(value).toBe(0);
  });

  it('Should be 4', () => {
   const value = component.compute(3);
   expect(value).toBe(4);
  });

  // get currencies
  it('Should be contained all', () => {
   const value = component.getCurrencies();
   expect(value).toContain('EUR');
   expect(value).toContain('AUD');
   expect(value).toContain('USD');
  });

  // greet
  it('should have lionel', () => {
   const value = component.greet('lionel');
   expect(value).toContain('lionel');
  });

  // vote
  it('shoule be incremented', () => {
   component.upVote();
   expect(component.totalVotes).toBe(1);
  });

  it('should be desincremented', () => {
   component.downVote();
   expect(component.totalVotes).toBe(-1);
  });

  // Form
  it('should be contained 2 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should required name control', () => {
   let value = component.form.get('name');
   value.setValue('');
   // tslint:disable-next-line:no-unused-expression
   expect(value.valid).toBeFalsy;
  });

  // services
  it('should be the same data', () => {

    const todo = [
      { id: 1, title: 'a' },
			{ id: 2, title: 'b' },
			{ id: 3, title: 'c' }
    ];

    spyOn(todoService, 'getTodos').and.callFake(
      () => of([JSON.stringify(todo)])
    );

    component.ngOnInit();
    expect(component.todos).toEqual([JSON.stringify(todo)]);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
		const spy = spyOn(todoService, 'add').and.callFake(_ => {
			return of();
		});

		component.add();

		expect(spy).toHaveBeenCalled();
	});

	 it('should add the new todo returned from the server', () => {
		const todo = { id: 1 };
		const spy = spyOn(todoService, 'add').and.callFake(_ => {
			return of(JSON.stringify(todo));
		});

		component.add();
		expect(component.todos.indexOf(todo)).toBeGreaterThan(-2);
	});

	 it('should set the message property when server returns an error when adding a new todo', () => {
		const error = 'error from the server';
		const spy = spyOn(todoService, 'add').and.returnValue(throwError(error));

		component.add();

		expect(component.message).toBe(error);
	});

	 it('should call the server to delete a todo item if the user confirms', () => {
		spyOn(window, 'confirm').and.returnValue(true);
		const spy = spyOn(todoService, 'delete').and.returnValue(EMPTY);

		component.delete(1);

		expect(spy).toHaveBeenCalledWith(1);
	});

	 it('should NOT call the server to delete a todo item if the user cancels', () => {
		spyOn(window, 'confirm').and.returnValue(false);
		const spy = spyOn(todoService, 'delete').and.returnValue(EMPTY);

		component.delete(1);

		expect(spy).not.toHaveBeenCalled();
	});

});
