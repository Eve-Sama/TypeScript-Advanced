import { Component } from '@angular/core';
import { Field } from './demo1.interface';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss'],
})
export class Demo1Component {
  fieldType: string;
  format: string = 'yyyy';
  /** 字段的详细信息 */
  field: Field;

  setField(type: string): void {
    this.fieldType = type;
    // 初始化field信息
    const id = '1';
    const value = '1';
    if (type === 'text') {
      this.field = {
        id,
        type,
        value,
      };
    } else if (type === 'date') {
      this.field = {
        id,
        value,
        type,
        format: this.format,
      };
    } else if (type === 'image') {
      this.field = {
        id,
        value,
        type,
        src: 'qingflow.com',
      };
    }
  }

  setFormat(type: string): void {
    this.format = type;
    this.field.format = type;
  }
}
