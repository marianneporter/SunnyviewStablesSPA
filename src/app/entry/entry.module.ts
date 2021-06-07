import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    EntryPageComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    EntryPageComponent
  ]
})
export class EntryModule { }
