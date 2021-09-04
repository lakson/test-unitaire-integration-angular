import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-unitaire-integration-angular';

  totalVotes = 0;
  form: FormGroup;
  todos: any[] = [];
	message;
  constructor(fb: FormBuilder, private service: TodoService) {
   this.form = fb.group({
			name: ['', Validators.required],
			email: ['']
   });
  }

  ngOnInit(): void {
   this.service.getTodos().subscribe(t => (this.todos = t));
   console.log('Increment positif à 2', this.compute(1));
   console.log('Tableau string', this.getCurrencies());
   console.log('string Lionel', this.greet('Lionel'));
  }

  /**
   * Incrementation nombre positif
   * @param number nombre entré
   * @returns number
   */
  compute(number): number {
		if (number < 0) {
		return 0;
		}
	  return number + 1;
  }

  /**
   * Tableau de devises
   * @returns array<string>
   */
  getCurrencies() {
	  return ['USD', 'AUD', 'EUR'];
  }

  /**
   * Chaine de caractère avec un nom
   * @param name nom donnée
   * @returns string
   */
  greet(name) {
	  return 'Bienvenue ' + name;
  }

  /**
   * Incrementation totalvotes
   */
	upVote() {
		this.totalVotes++;
	}

   /**
   * Desincrementation totalvotes
   */
	downVote() {
		this.totalVotes--;
  }

  /**
   * Ajoute à TodoList
   */
  add() {
		const newTodo = { title: '... ' };
		this.service.add(newTodo).subscribe(
			t => this.todos.push(t),
			err => (this.message = err)
		);
	}

  /**
   * supprimer du TodoList
   * @param id id entré
   */
	delete(id) {
		if (confirm('Êtes-vous sûr?')) {
			this.service.delete(id).subscribe();
		}
	}

}
