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
    Plus,
    LogOut,
    Loader,
    Search,
} from "lucide-react";
import Link from "next/link";
import { useGetCustomerBookingsQuery } from "@/Redux/features/bookings/bookingApiSlice";
import { Booking } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/app/store";
import { logout } from "@/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // You can adjust this number
    const [filteredData, setFilteredData] = useState<Booking[]>([]);

    const {
        data: BookingData = [],
        isLoading,
        // isError,
    } = useGetCustomerBookingsQuery({}, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        // Filter data based on search term
        const filtered = BookingData.filter((booking: Booking) => {
            return (
                booking.workshop?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.status.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm, BookingData]);

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin" />
            </div>
        );
    }

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
                <div className="flex gap-4">
                    <Link href="/dashboard/workshops" className="inline-flex items-center cursor-pointer">
                        <Button className="cursor-pointer">
                            <Plus className="mr-2 h-5 w-5" />Book New Workshop
                        </Button>
                    </Link>
                    <Button
                        className="cursor-pointer bg-black text-white"
                        onClick={() => {
                            dispatch(logout());
                            router.push('/login');
                        }}
                    >
                        <LogOut className="cursor-pointer" />
                        Logout
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>My Bookings</CardTitle>
                            <CardDescription>
                                Your upcoming and past workshop bookings
                            </CardDescription>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search bookings..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {currentItems.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                {searchTerm ? "No matching bookings found" : "You have no bookings yet"}
                            </p>
                            {!searchTerm && (
                                <Link href="/dashboard/workshops">
                                    <Button variant="link" className="mt-2">
                                        Browse available workshops
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 mb-6">
                                {currentItems.map((booking: Booking) => (
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
                                                        {booking.timeSlot?.startTime} - {booking.timeSlot?.endTime}
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
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-between items-center mt-4">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}