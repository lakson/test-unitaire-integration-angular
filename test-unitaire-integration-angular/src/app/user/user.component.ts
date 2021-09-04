import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  newUser = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  /**
   * Ajout de l'utilisateur
   * @returns void
   */
  addUser(): void {
    this.userService.addUser(this.newUser);
  }

  /**
   * Obtenir les utilisateurs
   * @returns void
   */
  getUsers(): string[] {
    return this.userService.getUsers();
  }

}
