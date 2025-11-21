// components/empty-leg/CompactSearchForm.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, ArrowLeftRight, Users, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Calendar20 } from "../calendar-20";

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

interface CompactSearchFormProps {
  onSearch: (data: any) => void;
}

export function CompactSearchForm({ onSearch }: CompactSearchFormProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState(4);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const searchData = {
      departureAirport: from,
      destinationAirport: to,
      passengers,
    };

    onSearch(searchData);
  };

  return (
    <Card className="border border-[#D4AF37]/20 p-2 md:p-6 lg:shadow-xl lg:bg-black/50 h-full">
      <div className="p-0 md:p-6 bg-white h-full">
        <p className="text-xl font-bold mb-2 text-black uppercase tracking-wide">
          Empty Leg Flights
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Significant savings on pre-positioned aircraft
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className="flex flex-col lg:flex-row space-y-2 w-full"
            ref={containerRef}
          >
            {/* Line 1: From + Swap + To */}
            <div className="flex w-full lg:w-2/4">
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
                        type="button"
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
                type="button"
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
                        type="button"
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

            {/* Line 2: Date */}
            <div className="flex w-full lg:w-1/4">
              <div className="w-full">
                <Calendar20 placeholder="Departure Date" />
              </div>
            </div>

            {/* Line 3: Passengers */}
            <div className="flex w-full lg:w-1/4 items-center">
              <div className="flex w-full justify-between items-center px-3 py-1 lg:-mt-2 bg-white border border-gray-300">
                <Users className="w-4 h-4 text-gray-500" />
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black rounded"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-black">
                    {passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassengers(passengers + 1)}
                    className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-2">
            <Button
              type="submit"
              variant={"outline"}
              className="w-full bg-[#D4AF37] text-[#0C0C0C] py-2"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Empty Legs
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
