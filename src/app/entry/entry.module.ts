import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const entryRoutes: Routes = [
    { path: 'entry', component: EntryPageComponent},
    { path: '', component: EntryPageComponent }   
]

@NgModule({
  declarations: [
    EntryPageComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(entryRoutes),
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EntryPageComponent
  ]
})
export class EntryModule { }
