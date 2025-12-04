import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ride } from '../../features/models/ride.model';

const STORAGE_KEY = 'transport_facility_rides';

@Injectable({ providedIn: 'root' })
export class RideService {
  private rides$ = new BehaviorSubject<Ride[]>(this.loadFromStorage());

  // Load rides from localStorage
  private loadFromStorage(): Ride[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Save rides to localStorage
  private saveToStorage(rides: Ride[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rides));
  }

  getAll(): Observable<Ride[]> {
    return this.rides$.asObservable();
  }

  getAllSnapshot(): Ride[] {
    return [...this.rides$.value];
  }

  // Add a ride (Employee can only add one ride)
  addRide(ride: Ride): boolean {
    const exists = this.rides$.value.some(r => r.ownerEmployeeId === ride.ownerEmployeeId);
    if (exists) return false;

    const updated = [...this.rides$.value, ride];
    this.rides$.next(updated);
    this.saveToStorage(updated);
    return true;
  }

  // Book a ride
  bookRide(rideId: string, employeeId: string): { ok: boolean; reason?: string } {
    const rides = this.rides$.value.map(r => ({ ...r }));
    const idx = rides.findIndex(r => r.id === rideId);
    if (idx === -1) return { ok: false, reason: 'not_found' };

    const ride = rides[idx];

    if (ride.ownerEmployeeId === employeeId) return { ok: false, reason: 'owner_cannot_book' };
    if (ride.bookedBy.includes(employeeId)) return { ok: false, reason: 'already_booked' };
    if (ride.vacantSeats <= 0) return { ok: false, reason: 'no_seats' };

    ride.vacantSeats -= 1;
    ride.bookedBy.push(employeeId);
    rides[idx] = ride;

    this.rides$.next(rides);
    this.saveToStorage(rides);

    return { ok: true };
  }

  // Search rides with vehicle type & time buffer
  search(vehicleType?: string, centerISO?: string, bufferMinutes = 60): Ride[] {
    return this.rides$.value.filter(r => {
      if (vehicleType && r.vehicleType !== vehicleType) return false;
      if (!centerISO) return true;

      const diff = Math.abs(new Date(r.timeISO).getTime() - new Date(centerISO).getTime());
      return diff <= bufferMinutes * 60 * 1000;
    });
  }
}
