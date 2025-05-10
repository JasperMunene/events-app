import { CalendarIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const SearchBar = () => {
  return (
    <div className="w-full max-w-[1020px] h-[50px] mx-auto bg-white border border-[#060608] overflow-hidden flex items-center shadow-sm">
      {/* Left half: Input section */}
      <div className="w-1/2 h-full px-4">
        <Input
          className="h-full w-full border-none shadow-none focus-visible:ring-0 text-gray-700 placeholder-gray-400 font-[family-name:var(--font-geist-sans)]"
          placeholder="Search events, names, locations and more..."
        />
      </div>

      <Separator orientation="vertical" className="h-10 border-gray-300" />


      {/* Right half: Calendar selector and Search button */}
      <div className="w-1/2 h-full flex items-center px-4 justify-between">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-500 font-[family-name:var(--font-geist-sans)]">
            Select date
          </span>
        </div>
        <Button className="flex items-center bg-[#4F4CEE] hover:bg-[#4F4CEE]/90 rounded-sm">
          <SearchIcon className="w-4 h-4 font-bold" />
        </Button>
      </div>
    </div>
  );
};
