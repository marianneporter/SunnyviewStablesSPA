import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOwnerDialogComponent } from './add-owner-dialog/add-owner-dialog.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddOwnerDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ AddOwnerDialogComponent]
})
export class OwnerModule { }
