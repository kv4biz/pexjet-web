"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDownIcon } from "lucide-react";

interface Calendar20Props {
  placeholder?: string; // custom placeholder
  onChange?: (val: { date?: string | null; time?: string | null }) => void;
}

export function Calendar20({
  placeholder = "Select date & time",
}: Calendar20Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  // Generate 15-minute time slots from 09:00 to 17:00
  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });

  const displayValue =
    date && selectedTime
      ? `${date.toLocaleDateString()} • ${selectedTime}`
      : date
      ? `${date.toLocaleDateString()} • Select time`
      : placeholder;

  // Define today and 12 months ahead
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal text-left"
        >
          {displayValue}
          <ChevronDownIcon className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0 w-full sm:w-auto max-w-[95vw]"
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Calendar */}
          <div className="p-3 border-b sm:border-b-0 sm:border-r">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              fromDate={today} // earliest selectable date
              toDate={maxDate} // latest selectable date
              className="rounded-md"
            />
          </div>

          {/* Time Slots */}
          <div className="max-h-80 overflow-y-auto p-3 w-full sm:w-48">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => {
                  setSelectedTime(time);
                  if (date) setOpen(false); // close only if date is chosen
                }}
                className="w-full mb-2"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
