"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useCreateBookingMutation } from "@/Redux/features/bookings/bookingApiSlice";
import { TimeSlot, Workshop } from "@/types";



export default function BookingForm({
    workshop,
    timeSlots,
}: {
    workshop: Workshop;
    timeSlots: TimeSlot[];
}) {
    const router = useRouter();
    const [selectedSlot, setSelectedSlot] = useState<string>("");

    const [createBooking, { isLoading }] = useCreateBookingMutation();

    const availableSlots = timeSlots.filter((slot: TimeSlot) => slot.availableSpots ?? 0 > 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSlot) return;

        try {
            await createBooking({
                workshopId: workshop.id,
                timeSlotId: Number(selectedSlot),
            }).unwrap();

            toast.success("Booking confirmed! Workshop successfully booked.");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error("Failed to create booking. Please try again.");
        }
    };

    if (availableSlots.length === 0) {
        return (
            <div className="text-center py-4">
                <p className="text-muted-foreground">No available time slots</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium">Select Time Slot</label>
                <Select onValueChange={setSelectedSlot}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableSlots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.id.toString()}>
                                {slot.startTime} - {slot.endTime} ({slot.availableSpots} spots left)
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !selectedSlot}>
                {isLoading ? "Processing..." : "Book Now"}
            </Button>
        </form>
    );
}
