export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  availableSpots: number;
}

export interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  maxCapacity: number;
  timeSlots: TimeSlot[];
}
