import { Component, OnInit } from '@angular/core';
import { Ride } from '../models/ride.model';
import { RideService } from '../../core/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  filteredRides: Ride[] = [];

  filterVehicle: string = '';
  filterTime: string = '';

  employeeId: string = ''; // For booking a ride

  message = '';

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.loadRides();
  }

  loadRides() {
    this.rides = this.rideService.getAllSnapshot();
    this.applyFilter();
  }

  applyFilter() {
    const timeISO = this.filterTime ? this.convertTimeToISO(this.filterTime) : undefined;
    this.filteredRides = this.rideService.search(this.filterVehicle, timeISO, 60);
  }

  // Convert hh:mm to ISO string for today's date
  private convertTimeToISO(time: string): string {
    const [hh, mm] = time.split(':');
    const today = new Date();
    today.setHours(+hh, +mm, 0, 0);
    return today.toISOString();
  }

  pickRide(ride: Ride) {
    if (!this.employeeId) {
      this.message = 'Please enter your Employee ID to book.';
      return;
    }

    const result = this.rideService.bookRide(ride.id, this.employeeId.trim());

    switch(result.reason) {
      case 'owner_cannot_book':
        this.message = 'You cannot book your own ride!';
        break;
      case 'already_booked':
        this.message = 'You have already booked this ride!';
        break;
      case 'no_seats':
        this.message = 'No vacant seats left!';
        break;
      case 'not_found':
        this.message = 'Ride not found!';
        break;
      default:
        if (result.ok) {
          this.message = 'Ride booked successfully!';
          this.loadRides(); // Refresh rides
        }
    }
  }
}
