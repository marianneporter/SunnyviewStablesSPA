import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TestForMobileGuard } from '../_guards/test-for-mobile.guard';
import { MobileEntryComponent } from './mobile-entry/mobile-entry.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';

const entryRoutes: Routes = [
    { path: 'entry', component: EntryPageComponent},
    { path: 'mobile', component: MobileEntryComponent },       
    { path: '', component: EntryPageComponent,
                canActivate: [TestForMobileGuard] } 
]

@NgModule({
  declarations: [
    EntryPageComponent,
    ToolbarComponent,
    LoginComponent,
    MobileEntryComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(entryRoutes),
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    EntryPageComponent
  ]
})
export class EntryModule { }
