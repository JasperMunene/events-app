import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import { UpcomingEventsSection } from '@/components/landing/UpcomingEvents'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UpcomingEventsSection />
    </div>

  )
}

export default Home