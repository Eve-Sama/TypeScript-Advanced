import { Component, OnInit } from '@angular/core';
import { Person } from './demo2.interface';
import { Demo2Service } from './demo2.request';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss'],
  providers: [Demo2Service],
})
export class Demo2Component implements OnInit {
  show: boolean;
  person: Person;
  personList: Person[] = [];
  mode: 'add' | 'edit';

  add(): void {
    this.person = {
      id: `${this._getUid()}`,
      bloodType: '',
      name: '',
      address: '',
    };
    this.show = true;
    this.mode = 'add';
  }

  edit(person: Person): void {
    this.demo2Service.getPerson(person).subscribe((v) => {
      this.person = v.person;
      this.show = true;
      this.mode = 'edit';
    });
  }

  addSubmit(): void {
    this.demo2Service
      .createPerson(this.person)
      .subscribe(() => this.initPersonList());
    this.show = false;
  }

  editSubmit(): void {
    this.demo2Service
      .updatePerson(this.person)
      .subscribe(() => this.initPersonList());
    this.show = false;
  }

  delete(person: Person): void {
    this.demo2Service
      .deletePerson(person)
      .subscribe(() => this.initPersonList());
    this.show = false;
  }

  /** 模拟随机生成id */
  private _getUid(): number {
    return Math.floor(Math.random() * (100000 - 0)) + 0;
  }

  private initPersonList(): void {
    this.demo2Service
      .getPersonList()
      .subscribe((v) => (this.personList = v.personList));
  }

  constructor(private demo2Service: Demo2Service) {}

  ngOnInit(): void {
    this.initPersonList();
  }
}
