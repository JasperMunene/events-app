import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import { UpcomingEventsSection, Event } from '@/components/landing/UpcomingEvents';
import { TopSellingSection } from '@/components/landing/TopSelling';
import { HotOffers } from '@/components/landing/HotOffers';

const Home = () => {
  // Event data to pass as props
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
  ];

  const artExhibitions = [
    {
      id: 1,
      month: "OCT",
      day: "20",
      title: "Frank Aurbach: The Fea..",
      price: "KES. 100.000 - 200.000",
      location: "Online",
      image: "/rectangle-2-4.png",
    },
    {
      id: 2,
      month: "OCT",
      day: "16",
      title: "Picasso: Extraordinary P..",
      price: "KES. 100.000 - 200.000",
      location: "Online",
      image: "/rectangle-2-5.png",
    },
    {
      id: 3,
      month: "SEP",
      day: "30",
      title: "TypeWknd 2021",
      price: "KES. 100.000 - 200.000",
      location: "Online",
      image: "/rectangle-2-6.png",
    },
    {
      id: 4,
      month: "OCT",
      day: "17",
      title: "David Hockney: Drawind ..",
      price: "KES. 100.000 - 200.000",
      location: "Online",
      image: "/rectangle-2-7.png",
    },
  ];

  const concerts = [
    {
      id: 1,
      month: "OCT",
      day: "1",
      title: "Bruno Major",
      price: "KES. 350.000 - 500.000",
      location: "Jakarta Convention Cen..",
      image: "/rectangle-2-8.png",
    },
    {
      id: 2,
      month: "OCT",
      day: "10",
      title: "Phum Viphurit",
      price: "KES. 350.000 - 500.000",
      location: "Jakarta Convention Cen..",
      image: "/rectangle-2-9.png",
    },
    {
      id: 3,
      month: "OCT",
      day: "4",
      title: "Sore",
      price: "KES. 350.000 - 500.000",
      location: "Jakarta Convention Cen..",
      image: "/rectangle-2-10.png",
    },
    {
      id: 4,
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
      <Hero />
      <UpcomingEventsSection title="Upcoming Events" events={events} />
      <HotOffers />
      <TopSellingSection />
      <UpcomingEventsSection title="Browse Arts" events={artExhibitions} />
      <UpcomingEventsSection title="Browse Concerts" events={concerts} />
    </div>
  );
};

export default Home;
