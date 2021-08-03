import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorComponent } from './error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedRoutes: Routes = [
    { path: 'error', component: ErrorComponent }  
]


@NgModule({
  declarations: [
      NavComponent,
      ErrorComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild(sharedRoutes),
      MaterialModule,
      FontAwesomeModule,
     
  ],
  exports: [
     
      NavComponent
  ]
})
export class SharedModule { }
