import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HorseListComponent } from "./horse-list/horse-list.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { UpdateGuard } from 'src/app/_guards/update.guard';
import { HorseListResolver } from 'src/app/_resolvers/horse-list.resolver';
import { MaterialModule } from 'src/app/shared/material.module';
import { HorseInterceptorProvider } from 'src/app/_interceptors/horse-interceptor';
import { HorseListElementComponent } from './horse-list-element/horse-list-element.component';
import { HorseAddUpdateComponent } from './horse-add-update/horse-add-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorseAddUpdateResolver } from 'src/app/_resolvers/horse-add-update.resolver';
import { HorseDetailComponent } from './horse-detail/horse-detail.component';
import { HorseDetailResolver } from 'src/app/_resolvers/horse-detail.resolver';
import { HorseCardsComponent } from './horse-cards/horse-cards.component';
import { UnsavedChangesGuard } from '../_guards/unsaved-changes.guard';


const horseRoutes: Routes = [
    { path: 'horse', component: HorseListComponent,
                     resolve: { horseData:HorseListResolver }, 
                     canActivate: [AuthGuard] },    
    { path: 'horse/add-edit/:id', component: HorseAddUpdateComponent,
                         resolve: { addUpdateData: HorseAddUpdateResolver }, 
                         canActivate: [AuthGuard, UpdateGuard],
                         canDeactivate: [UnsavedChangesGuard] }, 
    { path: 'horse/:id', component: HorseDetailComponent,
                         resolve: { horse: HorseDetailResolver }, 
                         canActivate: [AuthGuard] },                        
]

@NgModule({
  declarations: [
    HorseListComponent,
    HorseListElementComponent,
    HorseAddUpdateComponent,    
    HorseDetailComponent,
    HorseCardsComponent   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(horseRoutes),
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    HorseListComponent,
    HorseAddUpdateComponent
  ],
  providers: [ 
    HorseInterceptorProvider,
    UnsavedChangesGuard
  ],
})
export class HorseModule { }
