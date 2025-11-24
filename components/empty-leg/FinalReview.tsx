// components/empty-leg/FinalReview.tsx
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Empty Leg Request
        </h2>
        <p className="text-gray-600">
          Please review all details before submitting your empty leg booking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Flight Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            Flight Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">
                {searchData?.departureAirport || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">
                {searchData?.destinationAirport || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passengers:</span>
              <span className="font-medium">{searchData?.passengers || 1}</span>
            </div>
            {searchData?.departureDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Departure Date:</span>
                <span className="font-medium">
                  {formatDateForDisplay(searchData.departureDate)}
                  {searchData.departureTime &&
                    ` at ${searchData.departureTime}`}
                </span>
              </div>
            )}
          </div>

          {/* Selected Aircraft */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Selected Empty Leg
            </h3>
            {selectedAircraft ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={selectedAircraft.image}
                    alt={selectedAircraft.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{selectedAircraft.name}</div>
                    <div className="text-sm text-gray-600">
                      {selectedAircraft.departure} →{" "}
                      {selectedAircraft.destination}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedAircraft.date} at {selectedAircraft.time}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-[#D4AF37]">
                      {selectedAircraft.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">
                      {selectedAircraft.discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flight Time:</span>
                    <span className="font-medium">
                      {selectedAircraft.flightTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-medium">
                      {selectedAircraft.availableSeats} available
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No aircraft selected</p>
            )}
          </div>
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
                  <span className="font-medium text-sm bg-gray-50 p-2 rounded">
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
          className="bg-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/90 px-8"
        >
          <Check className="w-4 h-4 mr-2" />
          Submit Empty Leg Request
        </Button>
      </div>
    </div>
  );
}
