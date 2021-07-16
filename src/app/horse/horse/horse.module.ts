import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HorseListComponent } from "../horse-list/horse-list.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { HorseListResolver } from 'src/app/_resolvers/horse-list.resolver';
import { MaterialModule } from 'src/app/shared/material.module';


const horseRoutes: Routes = [
    { path: 'horse', component: HorseListComponent,
                     resolve: { horseCount:HorseListResolver }, 
                     canActivate: [AuthGuard] }  
]

@NgModule({
  declarations: [
    HorseListComponent   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(horseRoutes),
    SharedModule,
    MaterialModule   
  ],
  exports: [
    HorseListComponent
  ]
})
export class HorseModule { }
