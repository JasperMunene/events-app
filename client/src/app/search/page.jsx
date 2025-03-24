import { FooterSection } from '@/components/landing/Footer'
import Navbar from '@/components/search/Navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { MapPinIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
    const events = [
        {
          id: 1,
          title: "Panic! at the Disco",
          price: "KES. 45,000 - 150,000",
          location: "Uhuru Gardens",
          month: "NOV",
          day: "01",
          image: "/rectangle-2.png",
        },
        {
          id: 2,
          title: "Hamilton the Musical",
          price: "KES. 1000 - 10,000",
          location: "The O2 Arena",
          month: "NOV",
          day: "02",
          image: "/rectangle-2-13.svg",
        },
        {
          id: 3,
          title: "Anastasia the Musical",
          price: "KES. 8500 - 20,000",
          location: "Sarit Expo Center",
          month: "NOV",
          day: "03",
          image: "/rectangle-2-1.png",
        },
        {
          id: 4,
          title: "Ali Abdaal Seminar",
          price: "Free",
          location: "Online",
          month: "NOV",
          day: "06",
          image: "/rectangle-2-12.svg",
        },
        {
            id: 5,
            month: "OCT",
            day: "20",
            title: "Frank Aurbach: The Fea..",
            price: "KES. 100.000 - 200.000",
            location: "Online",
            image: "/rectangle-2-4.png",
          },
          {
            id: 6,
            month: "OCT",
            day: "16",
            title: "Picasso: Extraordinary P..",
            price: "KES. 100.000 - 200.000",
            location: "Online",
            image: "/rectangle-2-5.png",
          },
          {
            id: 7,
            month: "SEP",
            day: "30",
            title: "TypeWknd 2021",
            price: "KES. 100.000 - 200.000",
            location: "Online",
            image: "/rectangle-2-6.png",
          },
          {
            id: 8,
            month: "OCT",
            day: "17",
            title: "David Hockney: Drawind ..",
            price: "KES. 100.000 - 200.000",
            location: "Online",
            image: "/rectangle-2-7.png",
          },
          {
            id: 9,
            month: "OCT",
            day: "1",
            title: "Bruno Major",
            price: "KES. 350.000 - 500.000",
            location: "Jakarta Convention Cen..",
            image: "/rectangle-2-8.png",
          },
          {
            id: 10,
            month: "OCT",
            day: "10",
            title: "Phum Viphurit",
            price: "KES. 350.000 - 500.000",
            location: "Jakarta Convention Cen..",
            image: "/rectangle-2-9.png",
          },
          {
            id: 11,
            month: "OCT",
            day: "4",
            title: "Sore",
            price: "KES. 350.000 - 500.000",
            location: "Jakarta Convention Cen..",
            image: "/rectangle-2-10.png",
          },
          {
            id: 12,
            month: "OCT",
            day: "30",
            title: "Sophia Anne Caruso",
            price: "KES. 350.000 - 765.000",
            location: "Jakarta Convention Cen..",
            image: "/rectangle-2-11.png",
          },
      ];
    
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-20 font-[family-name:var(--font-geist-sans)]">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white p-6   border-r border-gray-200">
                            <h3 className="font-semibold text-lg mb-6">Filters</h3>

                            <div className="space-y-6">
                                {/* Online/Offline */}
                                <div>
                                    <h4 className="font-medium text-base mb-3">Online</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                        <Switch id="airplane-mode" />
                                        <Label htmlFor="airplane-mode">Online</Label>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <h4 className="font-medium text-base mb-3">Location</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="international" />
                                            <label htmlFor="international" className="text-gray-700">International</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="jakarta-selatan" />
                                            <label htmlFor="jakarta-selatan" className="text-gray-700">Nairobi</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="jakarta-timur" />
                                            <label htmlFor="jakarta-timur" className="text-gray-700">Mombasa</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div>
                                    <h4 className="font-medium text-base mb-3">Categories</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="movies" />
                                            <label htmlFor="movies" className="text-gray-700">Movies</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="concert" />
                                            <label htmlFor="concert" className="text-gray-700">Concert</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="arts" />
                                            <label htmlFor="arts" className="text-gray-700">Arts</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h4 className="font-medium text-base mb-3">Price Range</h4>
                                    <div className="flex items-center gap-2">
                                        <Input placeholder="Min" className="w-24" />
                                        <Separator orientation="vertical" className="h-6 border-gray-300" />
                                        <Input placeholder="Max" className="w-24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Placeholder */}
                    <div className="flex-1">
                        {/* Replace with your main content */}
                        <div className="bg-white p-6">
                            <h2 className="text-xl mb-5">Search Results for <span className='font-semibold'>"Drive in"</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
                        </div>
                    </div>
                </div>
            </div>
            <FooterSection />
        </div>
    )
}

export default Search;
