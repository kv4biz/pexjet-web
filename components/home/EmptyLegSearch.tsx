// components/home/EmptyLegSearch.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, ArrowLeftRight, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar20 } from "../calendar-20";
import { useRouter } from "next/navigation";

const airports = [
  { code: "JFK", city: "New York", country: "USA", flag: "🇺🇸" },
  { code: "LAX", city: "Los Angeles", country: "USA", flag: "🇺🇸" },
  { code: "LHR", city: "London", country: "UK", flag: "🇬🇧" },
  { code: "DXB", city: "Dubai", country: "UAE", flag: "🇦🇪" },
  { code: "CDG", city: "Paris", country: "France", flag: "🇫🇷" },
  { code: "NRT", city: "Tokyo", country: "Japan", flag: "🇯🇵" },
  { code: "SIN", city: "Singapore", country: "Singapore", flag: "🇸🇬" },
  { code: "FRA", city: "Frankfurt", country: "Germany", flag: "🇩🇪" },
];

export default function EmptyLegSearch() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenFrom(false);
        setOpenTo(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const filterAirports = (q: string) => {
    if (!q) return airports;
    const raw = q.trim().toLowerCase();
    return airports.filter(
      (a) =>
        a.code.toLowerCase().includes(raw) ||
        a.city.toLowerCase().includes(raw) ||
        a.country.toLowerCase().includes(raw)
    );
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // Handle Calendar20 date changes
  const handleDateChange = (value: {
    date?: string | null;
    time?: string | null;
  }) => {
    setDate(value.date || null);
    setTime(value.time || null);
  };

  const handleSubmit = () => {
    const payload = {
      type: "emptyLeg",
      from,
      to,
      passengers,
      date,
      time,
    };

    console.log("Empty Leg Submit:", payload);

    // Store the search data in sessionStorage
    sessionStorage.setItem("emptyLegSearchData", JSON.stringify(payload));

    // Navigate to empty-leg page
    router.push("/empty-leg");
  };

  return (
    <Card className="border border-[#D4AF37]/20 p-2 md:p-6 lg:shadow-xl lg:bg-black/50 h-full">
      <div className="p-0 md:p-6 bg-white h-full">
        <p className="text-xl font-bold mb-6 text-black uppercase tracking-wide">
          Empty Leg Flights
        </p>

        <div className="space-y-2" ref={containerRef}>
          {/* Line 1: From + Swap + To */}
          <div className="flex">
            {/* FROM */}
            <div className="relative flex-1">
              <Input
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => setOpenFrom(true)}
                className="bg-white text-black border-gray-300"
              />
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              {openFrom && (
                <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 shadow-sm rounded-md max-h-56 overflow-y-auto">
                  {filterAirports(from).map((a) => (
                    <button
                      key={a.code}
                      onMouseDown={() => setFrom(`${a.code} - ${a.city}`)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
                    >
                      <span className="text-2xl">{a.flag}</span>
                      <div className="text-sm text-black">
                        <div className="font-medium text-black">{a.code}</div>
                        <div className="text-xs text-gray-500">
                          {a.city}, {a.country}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <Button
              variant="ghost"
              onClick={swapLocations}
              className="p-2 border border-gray-200 bg-white text-black hover:bg-gray-50"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </Button>

            {/* TO */}
            <div className="relative flex-1">
              <Input
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => setOpenTo(true)}
                className="bg-white text-black border-gray-300"
              />
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              {openTo && (
                <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 shadow-sm rounded-md max-h-56 overflow-y-auto">
                  {filterAirports(to).map((a) => (
                    <button
                      key={a.code}
                      onMouseDown={() => setTo(`${a.code} - ${a.city}`)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
                    >
                      <span className="text-2xl">{a.flag}</span>
                      <div className="text-sm text-black">
                        <div className="font-medium text-black">{a.code}</div>
                        <div className="text-xs text-gray-500">
                          {a.city}, {a.country}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Line 2: Departure Date */}
          <div className="flex gap-2">
            <div className="w-full">
              <Calendar20
                placeholder="Departure Date"
                onChange={handleDateChange}
              />
            </div>
          </div>

          {/* Line 3: Passengers */}
          <div className="w-full flex items-center gap-2">
            <div className="w-full flex items-center justify-between px-3 py-1 bg-white border border-gray-300">
              <Users className="w-4 h-4 text-gray-500" />
              <div className="gap-2 flex">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black"
                >
                  −
                </button>
                <span className="w-6 text-center text-black">{passengers}</span>
                <button
                  onClick={() => setPassengers(passengers + 1)}
                  className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <Button
          variant={"outline"}
          onClick={handleSubmit}
          className="w-full mt-6 bg-[#D4AF37] text-[#0C0C0C]"
        >
          <Search className="w-4 h-4 mr-2" />
          Search Flights
        </Button>
      </div>
    </Card>
  );
}
