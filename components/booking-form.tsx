"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { createBooking } from "@/lib/api/bookings";

export default function BookingForm({ workshop, timeSlots }: { workshop: any, timeSlots: any[] }) {
    const router = useRouter();
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const availableSlots = timeSlots.filter(slot => slot.availableSpots > 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot) return;

        setIsLoading(true);
        try {
            await createBooking({
                workshopId: workshop.id,
                timeSlotId: selectedSlot,
            });
            toast({
                title: "Booking confirmed!",
                description: "Your workshop booking has been successfully created.",
            });
            router.push("/dashboard");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create booking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
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
                <Select onValueChange={setSelectedSlot} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableSlots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.id}>
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