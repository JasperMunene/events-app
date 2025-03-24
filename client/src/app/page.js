import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import { UpcomingEventsSection } from '@/components/landing/UpcomingEvents'
import { TopSellingSection } from '@/components/landing/TopSelling'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UpcomingEventsSection />
      <TopSellingSection />

    </div>
  )
}

export default Home