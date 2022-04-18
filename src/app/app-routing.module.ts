import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Demo1Component } from './demo1/question/demo1.component';
import { Demo2Component } from './demo2/question/demo2.component';
import { Demo3Component } from './demo3/question/demo3.component';
import { Demo4Component } from './demo4/question/demo4.component';

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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
