import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRideComponent } from './features/add-rides/add-ride.component';
import { RideListComponent } from './features/ride-list/ride-list.component';
import { PickRideComponent } from './features/pick-rides/pick-ride.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    RideListComponent,
    PickRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
