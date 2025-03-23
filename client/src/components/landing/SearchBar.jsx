import { CalendarIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const SearchBarSection = () => {
  return (
    <div className="w-full max-w-[1020px] h-[69px] mx-auto bg-white rounded overflow-hidden border-2 border-solid border-[#060608] flex items-center">
      {/* SearchIcon input section */}
      <div className="flex-1 h-full">
        <Input
          className="h-full w-full border-none shadow-none focus-visible:ring-0 font-body-text-medium text-textlight placeholder:font-[family-name:var(--font-geist-sans)]"
          placeholder="SearchIcon by events, name, location, and more"
        />
      </div>

      {/* Vertical separator */}
      <Separator orientation="vertical" className="h-[37px]" />

      {/* Date selector section */}
      <div className="flex items-center h-full px-4 flex-1 font-[family-name:var(--font-geist-sans)]">
        <CalendarIcon className="w-5 h-5 mr-3 text-textlight" />
        <span className="font-body-text-medium text-textlight">
          Select date
        </span>
      </div>

      {/* SearchIcon button */}
      <Button size='lg' className="flex items-center gap-1 mx-4 bg-[#4F4CEE] hover:bg-[#4F4CEE]/90 font-[family-name:var(--font-geist-sans)]">
        <SearchIcon className="w-[18px] h-[18px]" />
        <span className="text-white font-semibold">Search</span>
      </Button>
    </div>
  );
};
