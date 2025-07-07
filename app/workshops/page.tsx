"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, } from "lucide-react";
import Link from "next/link";
import { useGetWorkshopsQuery } from "@/Redux/features/workshops/workshopApiSlice";
import { TimeSlot, Workshop } from "@/types";



export default function WorkshopsPage() {
    const {
        data: workshopsData = [],
        isLoading: isWorkshopsLoading,
        isError: isWorkshopsError,
        error: workshopsError,
        refetch: refetchWorkshops
    } = useGetWorkshopsQuery({}, { refetchOnMountOrArgChange: true });

    console.log("Workshops Data:", workshopsData);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Available Workshops</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workshopsData.map((workshop: Workshop) => (
                    <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{workshop.title}</CardTitle>
                            <CardDescription>{workshop.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date(workshop.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm">
                                <Users className="mr-2 h-4 w-4" />
                                {workshop.maxCapacity - workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0)} / {workshop.maxCapacity} spots filled
                            </div>
                            <div className="pt-2">
                                <h4 className="text-sm font-medium mb-1">Available Time Slots:</h4>
                                <div className="space-y-1">
                                    {workshop.timeSlots.map((slot: TimeSlot) => (
                                        <div key={slot.id} className="flex justify-between items-center text-sm">
                                            <span className="flex items-center">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {slot.startTime} - {slot.endTime}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {slot.availableSpots} spots left
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/workshops/${workshop.id}`} className="w-full">
                                <Button className="w-full">View Details</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}