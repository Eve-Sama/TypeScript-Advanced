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
    const student = data as Student;
    const teacher = data as Teacher;
    if (student.message) {
      alert(student.message);
    } else {
      alert(teacher.info);
    }
  }
}
