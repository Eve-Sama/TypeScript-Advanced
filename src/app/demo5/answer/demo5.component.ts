import { Component } from '@angular/core';
import { Student, Teacher } from './demo5.interface';

@Component({
  selector: 'app-demo5',
  templateUrl: './demo5.component.html',
  styleUrls: ['./demo5.component.scss'],
})
export class Demo5Component {
  student: Student = {
    id: '1',
    message: '我是学生',
  };
  teacher: Teacher = {
    id: '1',
    info: '我是老师',
  };

  showInfo(data: Student | Teacher): void {
    if (this._instanceOf<Student>('message', data)) {
      alert(data.message);
    } else if (this._instanceOf<Teacher>('info', data)) {
      alert(data.info);
    }
  }

  private _instanceOf<T>(key: string, type: Record<string, any>): type is T {
    return key in type;
  }
}
