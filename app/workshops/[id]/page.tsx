"use client";

import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { TimeSlot } from "@/types";
import BookingForm from "@/components/booking-form";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/app/store";
import { useGetWorkshopsQuery } from "@/Redux/features/workshops/workshopApiSlice";

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
    const {
        data: workshopsData = [],
        isLoading: isWorkshopsLoading,
        isError: isWorkshopsError,
        error: workshopsError,
        refetch: refetchWorkshops
    } = useGetWorkshopsQuery({}, { refetchOnMountOrArgChange: true });

    const workshop = workshopsData

    if (!workshop) notFound();
    const { user } = useSelector((state: RootState) => state.auth);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{workshop.title}</h1>
                <Link href="/workshops">
                    <Button variant="outline">Back to Workshops</Button>
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Workshop Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{workshop.description}</p>

                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>
                                        {workshop.maxCapacity - workshop.timeSlots.reduce((sum: number, slot: TimeSlot) => sum + (slot.availableSpots || 0), 0)} / {workshop.maxCapacity} participants
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Available Time Slots</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {workshop.timeSlots.map((slot: TimeSlot) => (
                                <div key={slot.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <Clock className="h-5 w-5" />
                                            <span className="font-medium">
                                                {slot.startTime} - {slot.endTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-muted-foreground">
                                                {slot.availableSpots} spots available
                                            </span>
                                            {slot.availableSpots === 0 ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    <AlertCircle className="mr-1 h-3 w-3" />
                                                    Sold out
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                                    Available
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Book This Workshop</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user ? (
                                <BookingForm workshop={workshop} timeSlots={workshop.timeSlots} />
                            ) : (
                                <div className="space-y-4 text-center">
                                    <p>You need to be logged in to book this workshop</p>
                                    <div className="space-x-2">
                                        <Link href="/login">
                                            <Button>Login</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="outline">Register</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}