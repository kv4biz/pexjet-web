// components/charter/FinalReview.tsx
"use client";
import { Button } from "../ui/button";
import { ArrowLeft, Check } from "lucide-react";

interface FinalReviewProps {
  formData: any;
  onSubmit: () => void;
  onBack: () => void;
}

export function FinalReview({ formData, onSubmit, onBack }: FinalReviewProps) {
  const { searchData, selectedAircraft, contactInfo } = formData;

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string | null) => {
    if (!dateString) return "Not selected";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Get flights array
  const getFlights = () => {
    if (searchData.flights) {
      return searchData.flights;
    }
    return [
      {
        id: "1",
        from: searchData.departureAirport,
        to: searchData.destinationAirport,
        date: searchData.departureDate,
        returnDate: searchData.returnDate,
        time: searchData.departureTime,
        returnTime: searchData.returnTime,
        passengers: searchData.passengers,
      },
    ];
  };

  const flights = getFlights();
  const isMultiLeg = searchData.tripType === "multiLeg" && flights.length > 1;
  const isRoundTrip = searchData.tripType === "roundTrip";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Charter Request
        </h2>
        <p className="text-gray-600">
          Please review all details before submitting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Flight Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            Flight Details
          </h3>

          {isMultiLeg ? (
            // Multi-leg display
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip Type:</span>
                <span className="font-medium capitalize">Multi-Leg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Legs:</span>
                <span className="font-medium">{flights.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers:</span>
                <span className="font-medium">{searchData.passengers}</span>
              </div>

              {/* Display all flight legs */}
              <div className="space-y-3 mt-4">
                <h4 className="font-medium text-gray-800">Flight Legs:</h4>
                {flights.map((flight: any, index: number) => (
                  <div
                    key={flight.id}
                    className="bg-gray-50 p-3 rounded border"
                  >
                    <div className="font-medium text-sm mb-2">
                      Leg {index + 1}
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium">{flight.from}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium">{flight.to}</span>
                      </div>
                      {flight.date && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {formatDateForDisplay(flight.date)}
                            {flight.time && ` at ${flight.time}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : isRoundTrip ? (
            // Round trip display
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip Type:</span>
                <span className="font-medium capitalize">Round Trip</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="font-medium">{flights[0]?.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-medium">{flights[0]?.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers:</span>
                <span className="font-medium">{searchData.passengers}</span>
              </div>
              {flights[0]?.date && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">
                    {formatDateForDisplay(flights[0].date)}
                    {flights[0].time && ` at ${flights[0].time}`}
                  </span>
                </div>
              )}
              {flights[0]?.returnDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Return:</span>
                  <span className="font-medium">
                    {formatDateForDisplay(flights[0].returnDate)}
                    {flights[0].returnTime && ` at ${flights[0].returnTime}`}
                  </span>
                </div>
              )}
            </div>
          ) : (
            // One-way display
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip Type:</span>
                <span className="font-medium capitalize">One Way</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="font-medium">{flights[0]?.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-medium">{flights[0]?.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers:</span>
                <span className="font-medium">{searchData.passengers}</span>
              </div>
              {flights[0]?.date && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">
                    {formatDateForDisplay(flights[0].date)}
                    {flights[0].time && ` at ${flights[0].time}`}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Aircraft & Contact */}
        <div className="space-y-6">
          {/* Selected Aircraft */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Selected Aircraft ({selectedAircraft?.length || 0})
            </h3>
            {selectedAircraft && selectedAircraft.length > 0 ? (
              <div className="space-y-2">
                {selectedAircraft.map((aircraft: any) => (
                  <div
                    key={aircraft.id}
                    className="flex items-center gap-3 p-3 bg-gray-50"
                  >
                    <img
                      src={aircraft.image}
                      alt={aircraft.name}
                      className="w-12 h-12 object-cover "
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{aircraft.name}</div>
                      <div className="text-sm text-gray-600">
                        {aircraft.seats} seats • {aircraft.flightTime} •{" "}
                        {aircraft.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No aircraft selected</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Contact Information
            </h3>
            {contactInfo ? (
              <div className="space-y-2">
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
                  <div className="flex flex-col gap-1 pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Additional Notes:</span>
                    <span className="font-medium text-sm">
                      {contactInfo.notes}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No contact information provided
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onSubmit}
          variant={"outline"}
          className="bg-[#D4AF37] px-8"
        >
          <Check className="w-4 h-4 mr-2" />
          Submit Request
        </Button>
      </div>
    </div>
  );
}
