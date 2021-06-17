import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { EntryModule } from './entry/entry.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HorseModule } from './horse/horse/horse.module';
import { SharedModule } from './shared/shared.module';
 
export function tokenGetter() {
    return localStorage.getItem("jwtToken");
}

export const appRoutes: Routes = [
    { path: '**', redirectTo: 'entry',
                  pathMatch: 'full' }                                                            
]

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:44360'],
          disallowedRoutes: ['localhost:44340/api/auth'],
        },
    }),
    EntryModule,
    HorseModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
