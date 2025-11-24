// components/charter/CompactSearchForm.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  ArrowLeftRight,
  Users,
  Plus,
  Minus,
  Search,
} from "lucide-react";
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

interface Flight {
  id: string;
  from: string;
  to: string;
  date?: string | null;
  returnDate?: string | null;
  time?: string | null;
  returnTime?: string | null;
  passengers?: number;
}

export function CompactSearchForm({ onSearch }: CompactSearchFormProps) {
  const [tripType, setTripType] = useState<
    "one-way" | "round-trip" | "multi-leg"
  >("one-way");
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "1",
      from: "",
      to: "",
      date: null,
      returnDate: null,
      time: null,
      returnTime: null,
      passengers: 1,
    },
  ]);
  const [passengers, setPassengers] = useState(1);
  const [openFrom, setOpenFrom] = useState<string | null>(null);
  const [openTo, setOpenTo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load search data from sessionStorage on component mount
  useEffect(() => {
    const storedSearchData = sessionStorage.getItem("charterSearchData");

    if (storedSearchData) {
      try {
        const searchData = JSON.parse(storedSearchData);

        if (searchData.tripType) {
          const tripTypeMap: Record<
            string,
            "one-way" | "round-trip" | "multi-leg"
          > = {
            oneWay: "one-way",
            roundTrip: "round-trip",
            multiLeg: "multi-leg",
          };
          setTripType(tripTypeMap[searchData.tripType] || "one-way");
        }

        if (searchData.passengers) {
          setPassengers(searchData.passengers);
        }

        if (searchData.flights && searchData.flights.length > 0) {
          const updatedFlights = searchData.flights.map(
            (flight: any, index: number) => ({
              id: flight.id || `flight-${index + 1}`,
              from: flight.from || "",
              to: flight.to || "",
              date: flight.date || null,
              returnDate: flight.returnDate || null,
              time: flight.time || null,
              returnTime: flight.returnTime || null,
              passengers: flight.passengers || searchData.passengers || 1,
            })
          );

          setFlights(updatedFlights);
        }

        sessionStorage.removeItem("charterSearchData");
      } catch (error) {
        console.error("Error parsing stored search data:", error);
      }
    }
  }, []);

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
        returnTime: null,
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
      updates.returnTime = value.time || null;
    }

    updateFlight(flightId, updates);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store search data in sessionStorage before navigation
    const searchData = {
      type: "charter",
      tripType:
        tripType === "one-way"
          ? "oneWay"
          : tripType === "round-trip"
          ? "roundTrip"
          : "multiLeg",
      passengers,
      flights: tripType === "multi-leg" ? flights : [flights[0]],
    };

    console.log("Storing search data:", searchData);
    sessionStorage.setItem("charterSearchData", JSON.stringify(searchData));

    // Call the onSearch prop with the formatted data
    const mainFlight = flights[0];
    const formattedData = {
      departureAirport: mainFlight.from,
      destinationAirport: mainFlight.to,
      departureDate: mainFlight.date || "",
      departureTime: mainFlight.time || "",
      returnDate: mainFlight.returnDate || "",
      returnTime: mainFlight.returnTime || "",
      tripType: searchData.tripType,
      passengers,
      flights: searchData.flights,
    };

    onSearch(formattedData);
  };

  return (
    <Card className="border border-[#D4AF37]/20 p-2 md:p-6 lg:shadow-xl lg:bg-black/50 h-full">
      <div className="p-0 md:p-6 bg-white h-full">
        <p className="text-xl font-bold mb-2 text-black uppercase tracking-wide">
          Charter Flights
        </p>

        {/* Trip type radio */}
        <div className="flex gap-4 mb-2">
          {[
            { label: "One Way", value: "one-way" },
            { label: "Round Trip", value: "round-trip" },
            { label: "Multi-Leg", value: "multi-leg" },
          ].map((t) => (
            <label
              key={t.value}
              className="flex items-center gap-2 cursor-pointer text-black"
            >
              <input
                type="radio"
                name="tripType"
                value={t.value}
                checked={tripType === t.value}
                onChange={() => setTripType(t.value as any)}
                className="accent-[#D4AF37] w-4 h-4"
              />
              <span className="text-sm">{t.label}</span>
            </label>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Flight rows */}
          <div className="space-y-1" ref={containerRef}>
            {(tripType === "multi-leg" ? flights : [flights[0]]).map(
              (flight, idx) => (
                <div
                  key={flight.id}
                  className="flex flex-col lg:flex-row lg:items-start"
                >
                  {/* Location inputs - Fixed width */}
                  <div className="flex flex-1 min-w-0 ">
                    {/* FROM */}
                    <div className="relative flex-1 min-w-0">
                      <Input
                        placeholder="From"
                        value={flight.from}
                        onChange={(e) =>
                          updateFlight(flight.id, { from: e.target.value })
                        }
                        onFocus={() => setOpenFrom(flight.id)}
                        className="bg-white text-black border-gray-300 w-full"
                      />
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      {openFrom === flight.id && (
                        <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 shadow-sm  max-h-56 overflow-y-auto">
                          {filterAirports(flight.from).map((a) => (
                            <button
                              key={a.code}
                              type="button"
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
                      type="button"
                      variant="ghost"
                      onClick={() => swapLocations(flight.id)}
                      className="p-2 border border-gray-200 bg-white text-black hover:bg-gray-50 shrink-0"
                    >
                      <ArrowLeftRight className="w-5 h-5" />
                    </Button>

                    {/* TO */}
                    <div className="relative flex-1 min-w-0">
                      <Input
                        placeholder="To"
                        value={flight.to}
                        onChange={(e) =>
                          updateFlight(flight.id, { to: e.target.value })
                        }
                        onFocus={() => setOpenTo(flight.id)}
                        className="bg-white text-black border-gray-300 w-full"
                      />
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      {openTo === flight.id && (
                        <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-200 shadow-sm  max-h-56 overflow-y-auto">
                          {filterAirports(flight.to).map((a) => (
                            <button
                              key={a.code}
                              type="button"
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

                  {/* Date inputs - Fixed consistent width */}
                  <div
                    className={`flex min-w-0 ${
                      tripType === "round-trip"
                        ? "flex-col md:flex-row md:flex-1"
                        : "flex-1"
                    }`}
                  >
                    <div
                      className={
                        tripType === "round-trip" ? "flex-1 min-w-0" : "w-full"
                      }
                    >
                      <Calendar20
                        placeholder="Departure Date & Time"
                        value={
                          flight.date
                            ? {
                                date: flight.date,
                                time: flight.time || undefined,
                              }
                            : undefined
                        }
                        onChange={(value) =>
                          handleDateChange(flight.id, "date", value)
                        }
                      />
                    </div>

                    {tripType === "round-trip" && (
                      <div className="flex-1 min-w-0">
                        <Calendar20
                          placeholder="Return Date & Time"
                          value={
                            flight.returnDate
                              ? {
                                  date: flight.returnDate,
                                  time: flight.returnTime || undefined,
                                }
                              : undefined
                          }
                          onChange={(value) =>
                            handleDateChange(flight.id, "returnDate", value)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Passengers and Remove button - Fixed width */}
                  <div className="flex gap-2 items-center lg:w-auto">
                    <div className="flex items-center px-3 pt-1 pb-0.5 bg-white border border-gray-300  min-w-[120px] justify-between">
                      <Users className="w-4 h-4 text-gray-500 shrink-0" />
                      <div className="flex gap-2 items-center ml-2">
                        <button
                          type="button"
                          onClick={() => {
                            const next = Math.max(1, passengers - 1);
                            setPassengers(next);
                            updateFlight(flight.id, { passengers: next });
                          }}
                          className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black  shrink-0"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-black text-sm">
                          {flight.passengers ?? passengers}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = passengers + 1;
                            setPassengers(next);
                            updateFlight(flight.id, { passengers: next });
                          }}
                          className="w-7 h-7 inline-flex items-center justify-center border border-gray-300 text-black  shrink-0"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove flight (multi-leg only) */}
                    {tripType === "multi-leg" && flights.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeFlight(flight.id)}
                        className="bg-white text-red-600 border border-red-200 hover:bg-red-50 shrink-0 whitespace-nowrap"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              )
            )}

            {/* Add flight button */}
            {tripType === "multi-leg" && (
              <Button
                type="button"
                variant="outline"
                onClick={addFlight}
                className="text-[#D4AF37] border-[#D4AF37] bg-white w-full lg:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Flight
              </Button>
            )}
          </div>

          {/* Action button */}
          <div className="mt-2">
            <Button
              type="submit"
              variant={"outline"}
              className="w-full bg-[#D4AF37] text-[#0C0C0C] py-2"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Flights
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
