import Hero from '@/components/landing/Hero'
import Navbar from '@/components/landing/Navbar'
import { UpcomingEventsSection } from '@/components/landing/UpcomingEvents'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />

      {/* Upcoming Events Section */}
      <div className="mt-[350px] px-[120px]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-[family-name:var(--font-geist-sans)] font-semibold text-[30px]">
              Upcoming Events
            </h2>
            <Button
              variant="ghost"
              className="text-brandprimarydefault p-1.5 h-auto"
            >
              <span className="text-[#4F4CEE] text-[14px]">
                View All
              </span>
              <ChevronRightIcon className="w-[20px] h-[20px] text-[#4F4CEE]" />
            </Button>
          </div>

          <div className="relative">
            <UpcomingEventsSection />
            <Button
              size="icon"
              className="absolute top-32 right-0 w-[31px] h-[31px] p-0 bg-brandprimarydefault rounded"
            >
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
    </div>
  )
}

export default Home
