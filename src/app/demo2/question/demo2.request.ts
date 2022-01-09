import { Injectable } from '@angular/core';
import { Observable, of, mergeMap } from 'rxjs';
import { Person, UpdatePerson } from './demo2.interface';

@Injectable()
export class Demo2Service {
  createPerson(data: Person): Observable<{ id: string }> {
    return this.getPersonList().pipe(
      mergeMap((v) => {
        const { personList } = v;
        personList.push(data);
        // 模拟创建的请求, 在这里我就简单点了, 直接将其存在sesstionStorage里了.
        sessionStorage.setItem('demo2-person', JSON.stringify(personList));
        return of({ id: data.id });
      })
    );
  }

  getPerson(data: Person): Observable<{ person: Person }> {
    return this.getPersonList().pipe(
      mergeMap((v) => {
        const person = v.personList.find((person) => person.id === data.id);
        return of({ person });
      })
    );
  }

  updatePerson(data: UpdatePerson): Observable<{ id: string }> {
    return this.getPersonList().pipe(
      mergeMap((v) => {
        const person = v.personList.find((person) => person.id === data.id);
        person.name = data.name;
        person.address = data.address;
        sessionStorage.setItem('demo2-person', JSON.stringify(v.personList));
        return of({ id: person.id });
      })
    );
  }

  deletePerson(data: Person): Observable<{ id: string }> {
    return this.getPersonList().pipe(
      mergeMap((v) => {
        const index = v.personList.findIndex((person) => person.id === data.id);
        v.personList.splice(index, 1);
        sessionStorage.setItem('demo2-person', JSON.stringify(v.personList));
        return of({ id: data.id });
      })
    );
  }

  getPersonList(): Observable<{ personList: Person[] }> {
    let personList: Person[] = [];
    const data = sessionStorage.getItem('demo2-person');
    if (data) {
      personList = JSON.parse(data) as Person[];
    }
    return of({ personList });
  }
}
