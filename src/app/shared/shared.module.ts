import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
      NavComponent
  ],
  imports: [
      CommonModule,
      MaterialModule,
      FontAwesomeModule
  ],
  exports: [
      NavComponent
  ]
})
export class SharedModule { }
