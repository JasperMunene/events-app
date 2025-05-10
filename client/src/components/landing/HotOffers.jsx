import { ChevronRightIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const HotOffers = () => {
    const offers = [
        {
            id: 1,
            image: '/rectangle-2-3.png',
            alt: 'Special concert offer',
            title: 'Limited Time Offer',
            description: 'Get 20% off on selected events'
        },
        {
            id: 2,
            image: '/rectangle-2-2.png',
            alt: 'Festival season offer',
            title: 'Early Bird Special',
            description: 'Book now and save big'
        }
    ];

    return (
        <div className="mt-24 container mx-auto px-4 md:px-6 lg:px-8 xl:px-[120px] max-w-[1920px]">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-[family-name:var(--font-geist-sans)] font-semibold text-[30px]">
                    Hot offers
                </h2>
                <Link
                    href='/'
                    className="p-1.5 h-auto flex items-center group hover:opacity-80 transition-opacity"
                >
                    <span className="text-[#4F4CEE] text-[14px] font-bold font-[family-name:var(--font-geist-sans)]">
                        View All
                    </span>
                    <ChevronRightIcon className="w-[18px] h-[18px] text-[#4F4CEE] transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map((offer) => (
                    <div 
                        key={offer.id} 
                        className="relative aspect-[16/9] overflow-hidden rounded-lg group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        <Image
                            src={offer.image}
                            alt={offer.alt}
                            fill
                            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw"
                            priority
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                            <h3 className="text-white font-[family-name:var(--font-geist-sans)] text-2xl font-semibold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                {offer.title}
                            </h3>
                            <p className="text-white/90 font-[family-name:var(--font-geist-sans)] text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                {offer.description}
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}