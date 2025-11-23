// components/home/CharterSearch.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, ArrowLeftRight, Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar20 } from "../calendar-20";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TripType = "oneWay" | "roundTrip" | "multiLeg";

interface Flight {
  id: string;
  from: string;
  to: string;
  date?: string | null;
  returnDate?: string | null;
  time?: string | null;
  passengers?: number;
}

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

export default function CharterSearch() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>("oneWay");
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "1",
      from: "",
      to: "",
      date: null,
      returnDate: null,
      time: null,
      passengers: 1,
    },
  ]);
  const [passengers, setPassengers] = useState<number>(1);
  const [openFrom, setOpenFrom] = useState<string | null>(null);
  const [openTo, setOpenTo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addFlight = () => {
    setFlights((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        from: "",
        to: "",
        date: null,
        returnDate: null,
        time: null,
        passengers: passengers,
      },
    ]);
  };

  const removeFlight = (id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  const swapLocations = (id: string) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === id ? { ...f, from: f.to, to: f.from } : f))
    );
  };

  const updateFlight = (id: string, updates: Partial<Flight>) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenFrom(null);
        setOpenTo(null);
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

  const handleSubmit = () => {
    const payload = {
      type: "charter",
      tripType,
      passengers,
      flights,
    };

    console.log("Charter Submit:", payload);

    // Store the search data in sessionStorage
    sessionStorage.setItem("charterSearchData", JSON.stringify(payload));

    // Navigate to charter page
    router.push("/charter");
  };

  // Handle Calendar20 changes
  const handleDateChange = (
    flightId: string,
    field: "date" | "returnDate",
    value: { date?: string | null; time?: string | null }
  ) => {
    const updates: Partial<Flight> = {};

    if (field === "date") {
      updates.date = value.date || null;
      updates.time = value.time || null;
    } else if (field === "returnDate") {
      updates.returnDate = value.date || null;
    }

    updateFlight(flightId, updates);
  };

  return (
    <Card className="border border-[#D4AF37]/20 p-2 md:p-6 lg:shadow-xl lg:bg-black/50 h-full">
      <div className="p-2 md:p-6 bg-white h-full">
        <p className="text-xl font-bold mb-2 text-black uppercase tracking-wide">
          Charter Flights
        </p>

        {/* Trip type radio */}
        <div className="flex gap-4 mb-2">
          {[
            { label: "One Way", value: "oneWay" },
            { label: "Round Trip", value: "roundTrip" },
            { label: "Multi-Leg", value: "multiLeg" },
          ].map((t) => (
            <label
              key={t.value}
              className="flex items-center gap-2 cursor-pointer text-black"
            >
              <input
                type="radio"
                name="tripType"
                value={t.value}
                checked={tripType === (t.value as TripType)}
                onChange={() => setTripType(t.value as TripType)}
                className="accent-[#D4AF37] w-4 h-4"
              />
              <span className="text-sm">{t.label}</span>
            </label>
          ))}
        </div>

        {/* Flight rows */}
        <div className="space-y-2" ref={containerRef}>
          {(tripType === "multiLeg" ? flights : [flights[0]]).map(
            (flight, idx) => (
              <div key={flight.id} className="space-y-2">
                {/* Line 1: From + Swap + To */}
                <div className="flex">
                  {/* FROM */}
                  <div className="relative flex-1">
                    <Input
                      placeholder="From"
                      value={flight.from}
                      onChange={(e) =>
                        updateFlight(flight.id, { from: e.target.value })
                      }
                      onFocus={() => setOpenFrom(flight.id)}
                      className="bg-white text-black border-gray-300"
                    />
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    {openFrom === flight.id && (
                      <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 shadow-sm rounded-md max-h-56 overflow-y-auto">
                        {filterAirports(flight.from).map((a) => (
                          <button
                            key={a.code}
                            onMouseDown={() =>
                              updateFlight(flight.id, {
                                from: `${a.code} - ${a.city}`,
                              })
                            }
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
                          >
                            <span className="text-2xl">{a.flag}</span>
                            <div className="text-sm text-black">
                              <div className="font-medium text-black">
                                {a.code}
                              </div>
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
                    onClick={() => swapLocations(flight.id)}
                    className="p-2 border border-gray-200 bg-white text-black hover:bg-gray-50"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                  </Button>

                  {/* TO */}
                  <div className="relative flex-1">
                    <Input
                      placeholder="To"
                      value={flight.to}
                      onChange={(e) =>
                        updateFlight(flight.id, { to: e.target.value })
                      }
                      onFocus={() => setOpenTo(flight.id)}
                      className="bg-white text-black border-gray-300"
                    />
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    {openTo === flight.id && (
                      <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 shadow-sm rounded-md max-h-56 overflow-y-auto">
                        {filterAirports(flight.to).map((a) => (
                          <button
                            key={a.code}
                            onMouseDown={() =>
                              updateFlight(flight.id, {
                                to: `${a.code} - ${a.city}`,
                              })
                            }
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
                          >
                            <span className="text-2xl">{a.flag}</span>
                            <div className="text-sm text-black">
                              <div className="font-medium text-black">
                                {a.code}
                              </div>
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

                {/* Line 2: Dates */}
                <div
                  className={`flex ${tripType === "roundTrip" ? "" : "flex-1"}`}
                >
                  <div
                    className={tripType === "roundTrip" ? "flex-1" : "w-full"}
                  >
                    <Calendar20
                      placeholder="Departure Date"
                      onChange={(value) =>
                        handleDateChange(flight.id, "date", value)
                      }
                    />
                  </div>
                  {tripType === "roundTrip" && (
                    <div className="flex-1">
                      <Calendar20
                        placeholder="Return Date"
                        onChange={(value) =>
                          handleDateChange(flight.id, "returnDate", value)
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Line 3: Passengers */}
                <div className="flex w-full items-center ">
                  <div className="flex w-full justify-between items-center px-3 py-1 bg-white border border-gray-300">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const next = Math.max(1, passengers - 1);
                          setPassengers(next);
                          updateFlight(flight.id, { passengers: next });
                        }}
                        className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-black">
                        {flight.passengers ?? passengers}
                      </span>
                      <button
                        onClick={() => {
                          const next = passengers + 1;
                          setPassengers(next);
                          updateFlight(flight.id, { passengers: next });
                        }}
                        className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove flight (multi-leg only) */}
                  {tripType === "multiLeg" && flights.length > 1 && (
                    <Button
                      variant="destructive"
                      onClick={() => removeFlight(flight.id)}
                      className="bg-white text-red-600 border border-red-200"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            )
          )}

          {/* Add flight button */}
          {tripType === "multiLeg" && (
            <Button
              variant="outline"
              onClick={addFlight}
              className="text-[#D4AF37] border-[#D4AF37] bg-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Flight
            </Button>
          )}
        </div>

        {/* Action button */}
        <Button
          variant={"outline"}
          onClick={handleSubmit}
          className="w-full mt-2 bg-[#D4AF37] text-[#0C0C0C]"
        >
          <Search className="w-4 h-4 mr-2" />
          Request Quote
        </Button>
      </div>
    </Card>
  );
}
