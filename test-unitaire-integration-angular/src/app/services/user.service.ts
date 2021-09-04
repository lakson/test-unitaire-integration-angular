import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = ['Antonio', 'Alfred', 'John'];

  /**
   * Ajout d'utilisateur
   * @example addUser('Lionel');
   * @param user nom d'utilisateur
   * @returns void
   */
  addUser(user: string): void {
    if (!(this.users.filter(u => u === user).length > 0)) {
      this.users.push(user);
    }
  }

  /**
   * Obtenir tous les utilisateurs
   * @returns string[]
   */
  getUsers(): string[] {
    return this.users;
  }

}
