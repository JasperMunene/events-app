import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export const TopSellingSection = () => {
    // Data for the event cards
    const eventCards = [
        {
            id: 1,
            title: "Hillsong: Wonder Tour",
            ticketsLeft: 5,
            backgroundImage: "/rectangle-3.png",
        },
        {
            id: 2,
            title: "Hamilton the Musical",
            ticketsLeft: 8,
            backgroundImage: "/rectangle-3-1.png",
            backgroundPosition: "100% 100%",
        },
        {
            id: 3,
            title: "Batavia Madrigal Singers",
            ticketsLeft: 11,
            backgroundImage: "/rectangle-3-2.png",
        },
    ];

    return (
        <div className="mt-12 container mx-auto px-4 md:px-6 lg:px-8 xl:px-[120px] max-w-[1920px]">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-[family-name:var(--font-geist-sans)] font-semibold text-[30px]">
                    Top Selling
                </h2>
                <Link
                    href='/'
                    className="p-1.5 h-auto flex items-center group"
                >
                    <span className="text-[#4F4CEE] text-[14px] font-bold font-[family-name:var(--font-geist-sans)]">
                        View All
                    </span>
                    <ChevronRightIcon className="w-[18px] h-[18px] text-[#4F4CEE] transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {eventCards.map((event) => (
                    <Card
                        key={event.id}
                        className="relative h-[424px] rounded-lg overflow-hidden p-0 transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                        <CardContent className="p-0 h-full">
                            <div
                                className="relative h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${event.backgroundImage})`,
                                    backgroundPosition: event.backgroundPosition || "50% 50%",
                                }}
                            >
                                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-black/12 to-black transition-opacity group-hover:opacity-70" />

                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-white text-xl tracking-tight leading-tight font-semibold font-[family-name:var(--font-geist-sans)] mb-3">
                                        {event.title}
                                    </h3>

                                    <p className="text-red-500 text-lg font-medium font-[family-name:var(--font-geist-sans)]">
                                        {event.ticketsLeft} tickets left!
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
};