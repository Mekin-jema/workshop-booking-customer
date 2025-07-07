"use client";

import { Workshop } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function WorkshopCarousel({ workshops }: { workshops: Workshop[] }) {
    return (
        <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-1">
                {workshops.map((workshop) => (
                    <CarouselItem key={workshop.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>{workshop.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{new Date(workshop.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>
                                            {workshop.maxCapacity - workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0)} / {workshop.maxCapacity} spots
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Available Times:</h4>
                                        <div className="space-y-1">
                                            {workshop.timeSlots.slice(0, 2).map((slot) => (
                                                <div key={slot.id} className="flex items-center text-sm">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {slot.startTime} - {slot.endTime}
                                                </div>
                                            ))}
                                            {workshop.timeSlots.length > 2 && (
                                                <div className="text-xs text-muted-foreground">
                                                    +{workshop.timeSlots.length - 2} more slots
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/workshops/${workshop.id}`}>
                                        View Details
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
        </Carousel>
    );
}