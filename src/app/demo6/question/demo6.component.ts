import { Component } from '@angular/core';
import { Field } from './demo6.interface';

@Component({
  selector: 'app-demo6',
  templateUrl: './demo6.component.html',
  styleUrls: ['./demo6.component.scss'],
})
export class Demo6Component {
  createFormField(): void {
    const field: Field = {
      type: '',
      props: {}
    }
  }
}
