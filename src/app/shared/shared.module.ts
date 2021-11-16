import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorComponent } from './error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoWarningComponent } from './demo-warning/demo-warning.component';

const sharedRoutes: Routes = [
    { path: 'error', component: ErrorComponent }  
]


@NgModule({
  declarations: [
      NavComponent,
      ErrorComponent,
      DemoWarningComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild(sharedRoutes),
      MaterialModule,
      FontAwesomeModule,
     
  ],
  exports: [     
      NavComponent,
      DemoWarningComponent
  ]
})
export class SharedModule { }
