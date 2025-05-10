import Image from 'next/image'
import React from 'react'
import { SearchBarSection } from './SearchBar'

const Hero = () => {
    return (
        <div className="relative w-full min-h-[500px]">
              <div className="absolute inset-0 -z-10">
                <Image
                    src='/Frame-1355.png'
                    alt="Events background"
                    width={1920}
                    height={1080}
                />
            </div>
            
            <h1 className="absolute top-[152px] left-[380px] font-[family-name:var(--font-geist-sans)] text-[70px] tracking-[0px] leading-normal text-[#4F4CEE] font-medium">
                Exclusive events, priceless moments
            </h1>

            <div className="relative top-[580px]">  {/* Adjust this value to control overlap */}
                    <SearchBarSection />
                </div>
           
        </div>
    )
}

export default Hero
