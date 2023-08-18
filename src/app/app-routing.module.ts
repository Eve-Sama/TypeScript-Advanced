import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Demo1Component } from './demo1/question/demo1.component';
import { Demo2Component } from './demo2/question/demo2.component';
import { Demo3Component } from './demo3/question/demo3.component';
import { Demo4Component } from './demo4/question/demo4.component';
import { Demo5Component } from './demo5/question/demo5.component';
import { Demo6Component } from './demo6/question/demo6.component';
import { Demo7Component } from './demo7/answer/demo7.component';

const routes: Routes = [
  {
    path: 'demo1',
    component: Demo1Component,
  },
  {
    path: 'demo2',
    component: Demo2Component,
  },
  {
    path: 'demo3',
    component: Demo3Component,
  },
  {
    path: 'demo4',
    component: Demo4Component,
  },
  {
    path: 'demo5',
    component: Demo5Component,
  },
  {
    path: 'demo6',
    component: Demo6Component,
  },
  {
    path: 'demo7',
    component: Demo7Component,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
