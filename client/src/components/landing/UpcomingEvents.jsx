import { MapPinIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const UpcomingEventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Panic! at the Disco",
      price: "Rp. 450.000 - 975.000",
      location: "The Icon, BSD",
      month: "NOV",
      day: "01",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Hamilton the Musical",
      price: "Rp. 1.500.000 - 3.000.000",
      location: "Ciputra Artpreneur",
      month: "NOV",
      day: "02",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Anastasia the Musical",
      price: "Rp. 850.000 - 3.000.000",
      location: "Intercon, Pd. Indah",
      month: "NOV",
      day: "03",
      image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Ali Abdaal Seminar",
      price: "Free",
      location: "Online",
      month: "NOV",
      day: "06",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1920&auto=format&fit=crop",
    },
  ];

  return (
    <div className="w-full py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="relative aspect-video">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center bg-background text-foreground rounded p-2 min-w-[60px]">
                    <span className="text-sm font-medium">{event.month}</span>
                    <span className="text-xl font-bold">{event.day}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-primary text-sm">{event.price}</p>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
};