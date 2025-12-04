import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ride } from '../models/ride.model';
import { RideService } from '../../core/services/ride.service';

@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
  styleUrls: ['./pick-ride.component.scss']
})
export class PickRideComponent implements OnInit {
  ride: Ride | undefined;
  employeeIdForBooking = '';
  message = '';

  constructor(private route: ActivatedRoute, private rideService: RideService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ride = this.rideService.getAllSnapshot().find(r => r.id === id);
  }

  book() {
    if (!this.employeeIdForBooking || !this.ride) {
      this.message = 'Enter a valid Employee ID';
      return;
    }

    const res = this.rideService.bookRide(this.ride.id, this.employeeIdForBooking.trim());

    if (!res.ok) {
      this.message =
        res.reason === 'owner_cannot_book' ? 'Cannot book your own ride' :
        res.reason === 'already_booked' ? 'Already booked' :
        res.reason === 'no_seats' ? 'No seats available' : 'Booking failed';
      return;
    }

    this.message = 'Booking successful!';
    this.ride = this.rideService.getAllSnapshot().find(r => r.id === this.ride!.id);
  }
}
