import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Demo1Component } from './demo1/question/demo1.component';
import { Demo2Component } from './demo2/question/demo2.component';
import { Demo3Component } from './demo3/question/demo3.component';
import { Demo4Component } from './demo4/question/demo4.component';

@NgModule({
  declarations: [AppComponent, Demo1Component, Demo2Component, Demo3Component, Demo4Component],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
