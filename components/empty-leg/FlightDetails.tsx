// components/empty-leg/FlightDetails.tsx
"use client";

import { Card } from "../ui/card";
import { MapPin, Calendar, Users, Clock, Gauge, Package } from "lucide-react";

interface FlightDetailsProps {
  selectedDeal: any;
  searchData: any;
}

export function FlightDetails({
  selectedDeal,
  searchData,
}: FlightDetailsProps) {
  if (!selectedDeal) return null;

  return (
    <Card className="border border-[#D4AF37]/20 p-6 bg-white/95 backdrop-blur-sm sticky top-6 hidden lg:block">
      <h3 className="text-xl font-bold text-gray-900 mb-2 border-b pb-4">
        Flight Details
      </h3>

      {/* Selected Deal */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={selectedDeal.image}
            alt={selectedDeal.name}
            className="w-16 h-16 object-cover "
          />
          <div>
            <h4 className="font-semibold text-gray-900">{selectedDeal.name}</h4>
            <div className="text-sm text-[#D4AF37] font-bold">
              {selectedDeal.price}
            </div>
            <div className="text-xs text-gray-500 line-through">
              {selectedDeal.originalPrice}
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-1reen-200  p-3">
          <div className="text-center text-green-500 font-semibold">
            {selectedDeal.discount} SAVINGS
          </div>
        </div>
      </div>

      {/* Flight Route */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Departure</div>
              <div className="text-sm text-gray-600">
                {selectedDeal.departure}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gray-300 ml-4" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Destination</div>
              <div className="text-sm text-gray-600">
                {selectedDeal.destination}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Information */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <p>Date & Time:</p>
          </div>
          <p className="font-medium text-sm text-right">
            {selectedDeal.date}
            <br />
            at {selectedDeal.time}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <p>Flight Time:</p>
          </div>
          <p className="font-medium">{selectedDeal.flightTime}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <p>Available Seats:</p>
          </div>
          <p className="font-medium">
            {selectedDeal.availableSeats} of {selectedDeal.seats}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Package className="w-4 h-4" />
            <p>Luggage:</p>
          </div>
          <p className="font-medium">{selectedDeal.luggage}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Gauge className="w-4 h-4" />
            <p>Speed:</p>
          </div>
          <p className="font-medium">{selectedDeal.speed}</p>
        </div>
      </div>

      {/* Search Criteria hidden */}
      {/* {searchData && (
        <div className="p-4 bg-gray-50  border">
          <h4 className="font-semibold text-gray-900 mb-2">Your Search</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-600">Passengers:</p>
              <p className="font-medium">{searchData.passengers}</p>
            </div>
            {searchData.departureAirport && (
              <div className="flex justify-between">
                <p className="text-gray-600">From:</p>
                <p className="font-medium">
                  {searchData.departureAirport}
                </p>
              </div>
            )}
            {searchData.destinationAirport && (
              <div className="flex justify-between">
                <p className="text-gray-600">To:</p>
                <p className="font-medium">
                  {searchData.destinationAirport}
                </p>
              </div>
            )}
          </div>
        </div>
      )} */}
    </Card>
  );
}
