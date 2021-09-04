import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class TodoService {
	constructor(private http: HttpClient) {}

	/**
	 * Ajouter un todo
	 * @example add({title: 'un titre ici'})
	 * @param todo objet todo
	 * @returns Observable<any>
	 */
	add(todo): Observable<any> {
		return this.http.post('...', todo).pipe(map(r => JSON.stringify(r)));
	}

	/**
	 * Obtenir tous les Todos
	 * @returns observable<any>
	 */
	getTodos(): Observable<any> {
		return this.http.get('...').pipe(map(r => [JSON.stringify(r)]));
	}

	/**
	 * Supprimer un todo
	 * @param id ID du todo à supprimer
	 * @returns Observable<any>
	 */
	delete(id): Observable<any> {
		return this.http.delete('...').pipe(map(r => JSON.stringify(r)));
	}
}
