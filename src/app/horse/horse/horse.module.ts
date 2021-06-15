import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HorseListComponent } from "../horse-list/horse-list.component";


const horseRoutes: Routes = [
    { path: 'horse', component: HorseListComponent}  
]

@NgModule({
  declarations: [
    HorseListComponent   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(horseRoutes)
   
  ],
  exports: [
    HorseListComponent
  ]
})
export class HorseModule { }
