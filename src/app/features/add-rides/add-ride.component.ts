import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideService } from '../../core/services/ride.service';
import { Ride } from '../models/ride.model';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss']
})
export class AddRideComponent {
 
form!: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private rideService: RideService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleType: ['Car', Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: [1, [Validators.required, Validators.min(1)]],
      time: ['', Validators.required],
      pickupPoint: ['', Validators.required],
      destination: ['', Validators.required]
    });
  }

  private uuid() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // show errors for all fields
      return;
    }

    const val = this.form.value;
    const today = new Date();
    const [hh, mm] = val.time.split(':');
    today.setHours(+hh, +mm, 0, 0);

    const ride: Ride = {
      id: this.uuid(),
      ownerEmployeeId: val.employeeId.trim(),
      vehicleType: val.vehicleType,
      vehicleNo: val.vehicleNo.trim(),
      vacantSeats: +val.vacantSeats,
      timeISO: today.toISOString(),
      pickupPoint: val.pickupPoint.trim(),
      destination: val.destination.trim(),
      bookedBy: []
    };

    const ok = this.rideService.addRide(ride);
    this.message = ok ? 'Ride added successfully!' : 'You have already added a ride today';
    if (ok) this.form.reset({ vehicleType: 'Car', vacantSeats: 1 });
  }
}
