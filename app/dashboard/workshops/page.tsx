"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, CheckCircle2 } from "lucide-react";
import { useGetWorkshopsQuery } from "@/Redux/features/workshops/workshopApiSlice";
import { useGetCustomerBookingsQuery } from "@/Redux/features/bookings/bookingApiSlice";
import { Booking, Workshop } from "@/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/app/store";

export default function WorkshopsPage() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const userId = user?.id;

    const {
        data: workshopsData = [],
        isLoading: isWorkshopsLoading,
    } = useGetWorkshopsQuery({}, { refetchOnMountOrArgChange: true });

    const {
        data: userBookings = [],
        isLoading: isBookingsLoading,
    } = useGetCustomerBookingsQuery(userId, { skip: !userId });

    if (isWorkshopsLoading || isBookingsLoading) {
        return <div>Loading workshops...</div>;
    }

    const bookedWorkshopIds = userBookings.map((booking: Booking) => booking.workshopId);

    const handleViewDetails = (workshopId: number) => {
        router.push(`/dashboard/workshops/${workshopId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Available Workshops</h1>
            </div>

            {workshopsData.length === 0 ? (
                <div className="text-muted-foreground text-center py-10 text-lg">
                    No workshops available at the moment. Please check back later.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {workshopsData.map((workshop: Workshop) => {
                        const isBooked = bookedWorkshopIds.includes(workshop.id);
                        const availableSpots = workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0);
                        const spotsFilled = workshop.maxCapacity - availableSpots;

                        return (
                            <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{workshop.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {workshop.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {new Date(workshop.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Users className="mr-2 h-4 w-4" />
                                        {spotsFilled} / {workshop.maxCapacity} spots filled
                                    </div>
                                    {isBooked && (
                                        <div className="flex items-center text-sm text-green-600">
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            You've booked this workshop
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full cursor-pointer"
                                        onClick={() => handleViewDetails(workshop.id)}
                                        disabled={isBooked}
                                    >
                                        {isBooked ? "Already Booked" : "View Details"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
