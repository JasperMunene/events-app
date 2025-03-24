import React from "react";
import { ChevronRightIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";



export const UpcomingEventsSection= ({ title, events }) => {
  const containerMargin = title === "Upcoming Events" ? "mt-[350px]" : "mt-24";
  return (
    <div className={`${containerMargin} container mx-auto px-4 md:px-6 lg:px-8 xl:px-[120px] max-w-[1920px]`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-[family-name:var(--font-geist-sans)] font-semibold text-[30px]">
          {title}
        </h2>
        <Link href='/' className="p-1.5 h-auto flex">
          <span className="text-[#4F4CEE] text-[14px] font-bold font-[family-name:var(--font-geist-sans)]">
            View All
          </span>
          <ChevronRightIcon className="w-[18px] h-[18px] text-[#4F4CEE]" />
        </Link>
      </div>

      <div className="relative w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="h-72 rounded overflow-hidden border border-solid border-[#bdbdbd] p-0 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative h-full">
                <img
                  className="w-full h-[184px] object-cover"
                  alt={event.title}
                  src={event.image}
                />
                <CardContent className="p-0 h-[104px] border-t border-solid border-[#1b1b25] bg-white">
                  <div className="flex items-start gap-4 pt-3.5 px-4">
                    <div className="flex flex-col items-center gap-1 min-w-[40px]">
                      <div className="font-medium font-[family-name:var(--font-geist-sans)]">
                        {event.month}
                      </div>
                      <div className="font-bold font-[family-name:var(--font-geist-sans)] text-lg">
                        {event.day}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="font-bold font-[family-name:var(--font-geist-sans)] line-clamp-1">
                        {event.title}
                      </div>
                      <div className="text-sm font-[family-name:var(--font-geist-sans)]">
                        {event.price}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-4 h-4 text-[#4F4CEE]" />
                        <div className="text-sm font-[family-name:var(--font-geist-sans)] line-clamp-1">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        <Button
          size="icon"
          className="absolute top-32 -right-4 w-[31px] h-[31px] p-0 bg-[#4F4CEE] rounded hover:bg-[#3f3cbe] transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
