import { Component, OnInit } from '@angular/core';
import { User } from './demo7.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
  styleUrls: ['./demo7.component.scss'],
})
export class Demo7Component implements OnInit {
  userList: User[] = [];

  addUser(beingAdmin = false): void {
    this.userList.push(this._createUser(beingAdmin));
  }

  deleteUser(index: number): void {
    this.userList.splice(index, 1);
  }

  existAdmin(): boolean {
    return this.userList.some(v => v.beingAdmin);
  }

  private _createUser(beingAdmin = false): User {
    const id = uuidv4();
    return {
      id,
      name: `用户${id.split('-')[1]}`,
      beingAdmin,
    };
  }

  ngOnInit(): void {
    new Array(3).fill(1).forEach(() => {
      this.userList.push(this._createUser());
    });
    console.log(this.userList, `this.userList`);
  }
}
