import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EntryPageComponent } from './entry-page/entry-page.component';

@NgModule({
  declarations: [
    EntryPageComponent,
    ToolbarComponent
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
