//data structure for a ride ensuring all components and services share the same contrac.
//avoids repeating type definations in multiple components. 
export type VehicleType = 'Bike' | 'Car';

export interface Ride {
  id: string;                   // Unique ride ID
  ownerEmployeeId: string;      // Employee who adds the ride
  vehicleType: VehicleType;     // Bike or Car
  vehicleNo: string;            // Vehicle number (mandatory)
  vacantSeats: number;          // Seats available (mandatory)
  timeISO: string;              // Time of ride in ISO format (mandatory)
  pickupPoint: string;          // Pick-up location (mandatory)
  destination: string;          // Destination (mandatory)
  bookedBy: string[];           // List of Employee IDs who booked
}
