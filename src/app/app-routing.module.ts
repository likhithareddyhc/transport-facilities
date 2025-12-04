import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRideComponent } from './features/add-rides/add-ride.component';
import { PickRideComponent } from './features/pick-rides/pick-ride.component';
import { RideListComponent } from './features/ride-list/ride-list.component';

const routes: Routes = [
   { path: '',redirectTo:'add',pathMatch: 'full'},
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: 'add', component: AddRideComponent },
  { path: 'pick/:id', component: PickRideComponent },
  { path: 'list', component: RideListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
