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

  // Calculate price and time ranges for multiple aircraft
  const calculateRanges = () => {
    if (!selectedAircraft || selectedAircraft.length === 0) return null;

    const prices = selectedAircraft.map((aircraft: { price: string }) =>
      parseFloat(aircraft.price.replace(/[^\d.]/g, ""))
    );
    const flightTimes = selectedAircraft.map(
      (aircraft: { flightTime: string }) =>
        parseFloat(aircraft.flightTime.replace(" hrs", ""))
    );

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minTime = Math.min(...flightTimes);
    const maxTime = Math.max(...flightTimes);

    // Calculate total for multi-leg
    const multiplier =
      searchData.tripType === "multi-leg" && searchData.flights
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

  return (
    <Card className="border border-[#D4AF37]/20 p-6 bg-white/95 backdrop-blur-sm sticky top-6">
      <p className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
        Flight Summary
      </p>

      {/* Flight Route */}
      <div className="space-y-2">
        {searchData.tripType === "multi-leg" && searchData.flights ? (
          // Multi-leg display
          <div className="space-y-4">
            {searchData.flights.map((flight: any, index: number) => (
              <div key={flight.id} className="space-y-3">
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

                {index < searchData.flights.length - 1 && (
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
                    {searchData.departureAirport || "Not selected"}
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
                    {searchData.destinationAirport || "Not selected"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flight Details */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <Calendar className="w-4 h-4" />
            <p>Trip Type:</p>
          </div>
          <p className="font-medium capitalize">
            {searchData.tripType?.replace("-", " ") || "One Way"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <Users className="w-4 h-4" />
            <p>Passengers:</p>
          </div>
          <p className="font-medium">{searchData.passengers || 1}</p>
        </div>

        {searchData.departureDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Clock className="w-4 h-4" />
              <p>Departure:</p>
            </div>
            <p className="font-medium">{searchData.departureDate}</p>
          </div>
        )}

        {searchData.returnDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Clock className="w-4 h-4" />
              <p>Return:</p>
            </div>
            <p className="font-medium">{searchData.returnDate}</p>
          </div>
        )}

        {/* Price Range */}
        {ranges && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <DollarSign className="w-4 h-4" />
              <p className="font-medium">Price Range:</p>
            </div>
            <p className="">
              {ranges.priceRange}
              {searchData.tripType === "multi-leg" && searchData.flights && (
                <p className="ml-1">({searchData.flights.length} legs)</p>
              )}
            </p>
          </div>
        )}

        {/* Flight Time Range */}
        {ranges && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800">
              <Plane className="w-4 h-4" />
              <p className="font-semibold">Flight Time:</p>
            </div>
            <p className="font-medium">{ranges.timeRange}</p>
          </div>
        )}
      </div>

      {/* Selected Aircraft */}
      {selectedAircraft && selectedAircraft.length > 0 && (
        <div className="">
          <p className="font-semibold text-gray-800 ">
            Selected Aircraft ({selectedAircraft.length})
          </p>
          <div className="flex flex-col gap-1">
            {selectedAircraft.map((aircraft: any) => (
              <div
                key={aircraft.id}
                className=" text-sm font-medium text-gray-500"
              >
                {aircraft.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      {contactInfo && (
        <div className="p-2 bg-gray-50 border">
          <p className="font-semibold text-gray-800">Contact Details</p>
          <div className="space-y-2 text-sm">
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
      <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
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
