// components/charter/FlightSummary.tsx
"use client";
import { Card } from "../ui/card";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  DollarSign,
  Plane,
} from "lucide-react";

interface FlightSummaryProps {
  formData: any;
  currentStep: number;
}

export function FlightSummary({ formData, currentStep }: FlightSummaryProps) {
  const { searchData, selectedAircraft, contactInfo } = formData;

  if (!searchData) return null;

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string | null) => {
    if (!dateString) return "Not selected";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Calculate price and time ranges for multiple aircraft
  const calculateRanges = () => {
    if (!selectedAircraft || selectedAircraft.length === 0) return null;

    const prices = selectedAircraft.map((aircraft: { price: string }) =>
      parseFloat(aircraft.price?.replace(/[^\d.]/g, "") || "0")
    );
    const flightTimes = selectedAircraft.map(
      (aircraft: { flightTime: string }) =>
        parseFloat(aircraft.flightTime?.replace(" hrs", "") || "0")
    );

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minTime = Math.min(...flightTimes);
    const maxTime = Math.max(...flightTimes);

    // Calculate total for multi-leg
    const multiplier =
      searchData.tripType === "multiLeg" && searchData.flights
        ? searchData.flights.length
        : 1;

    return {
      priceRange: `$${(minPrice * multiplier).toLocaleString()} - $${(
        maxPrice * multiplier
      ).toLocaleString()}`,
      timeRange:
        minTime === maxTime ? `${minTime} hrs` : `${minTime} - ${maxTime} hrs`,
      aircraftCount: selectedAircraft.length,
    };
  };

  const ranges = calculateRanges();

  // Get flights array - handle both data structures
  const getFlights = () => {
    if (searchData.flights) {
      return searchData.flights;
    }
    // Fallback for old data structure
    return [
      {
        id: "1",
        from: searchData.departureAirport,
        to: searchData.destinationAirport,
        date: searchData.departureDate,
        returnDate: searchData.returnDate,
        time: searchData.departureTime,
        passengers: searchData.passengers,
      },
    ];
  };

  // Get trip type - handle both data structures
  const getTripType = () => {
    return searchData.tripType || "oneWay";
  };

  // Get passenger count
  const getPassengerCount = () => {
    return (
      searchData.passengers ||
      (searchData.flights && searchData.flights[0]?.passengers) ||
      1
    );
  };

  const flights = getFlights();
  const tripType = getTripType();
  const passengerCount = getPassengerCount();

  return (
    <Card className="border border-[#D4AF37]/20 p-6 bg-white/95 backdrop-blur-sm sticky top-6">
      <p className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
        Flight Summary
      </p>

      {/* Flight Route */}
      <div className="space-y-2">
        {tripType === "multiLeg" && flights.length > 1 ? (
          // Multi-leg display
          <div className="space-y-4">
            {flights.map((flight: any, index: number) => (
              <div key={flight.id || index} className="space-y-3">
                {/* From */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Leg {index + 1} - From
                      </div>
                      <div className="text-sm text-gray-600">
                        {flight.from || "Not selected"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Line + Upside-Down Plane */}
                <div className="flex justify-center">
                  <div className="relative flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-gray-300" />

                    <Plane className="w-4 h-4 text-gray-400 rotate-180 my-1" />

                    <div className="w-0.5 h-6 bg-gray-300" />
                  </div>
                </div>

                {/* To */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Leg {index + 1} - To
                      </div>
                      <div className="text-sm text-gray-600">
                        {flight.to || "Not selected"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flight Date */}
                {flight.date && (
                  <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-3 h-3" />
                      <span>Date:</span>
                    </div>
                    <span className="font-medium">
                      {formatDateForDisplay(flight.date)}
                      {flight.time && ` at ${flight.time}`}
                    </span>
                  </div>
                )}

                {index < flights.length - 1 && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-center text-sm text-gray-500">
                      ↪ Next Leg
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Single leg or round trip display
          <div className="space-y-2">
            {/* Departure */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Departure</div>
                  <div className="text-sm text-gray-600">
                    {flights[0]?.from || "Not selected"}
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Line + Upside-Down Plane */}
            <div className="flex justify-center">
              <div className="relative flex flex-col items-center">
                <div className="w-0.5 h-4 bg-gray-300" />

                <Plane className="w-5 h-5 text-gray-400 rotate-180 my-1" />

                <div className="w-0.5 h-4 bg-gray-300" />
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Destination</div>
                  <div className="text-sm text-gray-600">
                    {flights[0]?.to || "Not selected"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flight Details */}
      <div className="space-y-1 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <Calendar className="w-4 h-4" />
            <p>Trip Type:</p>
          </div>
          <p className="font-medium capitalize">
            {tripType?.replace("-", " ") || "One Way"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <Users className="w-4 h-4" />
            <p>Passengers:</p>
          </div>
          <p className="font-medium">{passengerCount}</p>
        </div>

        {flights[0]?.date && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Clock className="w-4 h-4" />
              <p>Departure:</p>
            </div>
            <p className="font-medium text-sm">
              {formatDateForDisplay(flights[0].date)}
              {flights[0].time && ` at ${flights[0].time}`}
            </p>
          </div>
        )}

        {flights[0]?.returnDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Clock className="w-4 h-4" />
              <p>Return:</p>
            </div>
            <p className="font-medium text-sm">
              {formatDateForDisplay(flights[0].returnDate)}
            </p>
          </div>
        )}

        {/* Price Range */}
        {ranges && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-800">
              <DollarSign className="w-4 h-4" />
              <p className="font-medium">Price Range:</p>
            </div>
            <p className="font-semibold text-[#D4AF37]">
              {ranges.priceRange}
              {tripType === "multiLeg" && flights.length > 1 && (
                <span className="text-xs text-gray-500 ml-1">
                  ({flights.length} legs)
                </span>
              )}
            </p>
          </div>
        )}

        {/* Flight Time Range */}
        {ranges && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Plane className="w-4 h-4" />
              <p className="font-medium">Flight Time:</p>
            </div>
            <p className="font-medium">{ranges.timeRange}</p>
          </div>
        )}
      </div>

      {/* Selected Aircraft */}
      {selectedAircraft && selectedAircraft.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">
            Selected Aircraft ({selectedAircraft.length})
          </p>
          <div className="flex flex-col gap-2">
            {selectedAircraft.map((aircraft: any, index: number) => (
              <div
                key={aircraft.id || index}
                className="text-sm bg-gray-50 p-2 rounded border"
              >
                <div className="font-medium text-gray-700">{aircraft.name}</div>
                {aircraft.price && (
                  <div className="text-xs text-gray-600 mt-1">
                    Price:{" "}
                    <span className="font-semibold">{aircraft.price}</span>
                  </div>
                )}
                {aircraft.flightTime && (
                  <div className="text-xs text-gray-600">
                    Flight Time:{" "}
                    <span className="font-semibold">{aircraft.flightTime}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      {contactInfo && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">Contact Details</p>
          <div className="space-y-2 text-sm bg-gray-50 p-3 rounded border">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {contactInfo.firstName} {contactInfo.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{contactInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{contactInfo.phone}</span>
            </div>
            {contactInfo.company && (
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{contactInfo.company}</span>
              </div>
            )}
            {contactInfo.notes && (
              <div className="pt-2 border-t border-gray-200">
                <div className="text-gray-600 mb-1">Notes:</div>
                <div className="text-xs text-gray-700 bg-white p-2 rounded border">
                  {contactInfo.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Current Step:</span>
          <span className="font-semibold text-gray-500">
            {currentStep === 1 && "Aircraft Selection"}
            {currentStep === 2 && "Contact Details"}
            {currentStep === 3 && "Review & Submit"}
          </span>
        </div>
      </div>
    </Card>
  );
}
