"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Plus,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { useGetCustomerBookingsQuery } from "@/Redux/features/bookings/bookingApiSlice";
import { Booking } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/app/store";
import { logout } from "@/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter()
    const dispatch = useDispatch()

    const {
        data: BookingData = [],
        isLoading,
        isError,
    } = useGetCustomerBookingsQuery({}, { refetchOnMountOrArgChange: true });

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-muted-foreground">
                    Access denied. Please log in as a customer.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <div className="flex gap-14">

                    <Link href="/dashboard/workshops" className="inline-flex items-center cursor-pointer">

                        <Button className="cursor-pointer">   <Plus className="mr-2 h-5 w-5" />Book New Workshop</Button>
                    </Link>
                    <Button
                        className="cursor-pointer"
                        variant="ghost"
                        onClick={() => {
                            dispatch(logout())
                            router.push('/login')
                        }}
                    >
                        <LogOut className="cursor-pointer" />
                    </Button>
                </div>

            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                        Your upcoming and past workshop bookings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {BookingData.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">You have no bookings yet</p>
                            <Link href="/workshops">
                                <Button variant="link" className="mt-2">
                                    Browse available workshops
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {BookingData.map((booking: Booking) => (
                                <div
                                    key={booking.id}
                                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">
                                                {booking.workshop?.title ?? "Untitled Workshop"}
                                            </h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                                                <span className="flex items-center">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {new Date(booking.workshop?.date ?? "").toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock className="mr-1 h-4 w-4" />
                                                    {booking.timeSlotId?.startTime} - {booking.timeSlotId?.endTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {booking.status === "CONFIRMED" ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                                    Confirmed
                                                </span>
                                            ) : booking.status === "CANCELLED" ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    <XCircle className="mr-1 h-3 w-3" />
                                                    Cancelled
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    Pending
                                                </span>
                                            )}
                                            <Link href={`/dashboard/booking/${booking.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
