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
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">
                {searchData?.departureAirport}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">
                {searchData?.destinationAirport}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trip Type:</span>
              <span className="font-medium capitalize">
                {searchData?.tripType?.replace("-", " ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passengers:</span>
              <span className="font-medium">{searchData?.passengers}</span>
            </div>
            {searchData?.departureDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Departure:</span>
                <span className="font-medium">{searchData.departureDate}</span>
              </div>
            )}
            {searchData?.returnDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Return:</span>
                <span className="font-medium">{searchData.returnDate}</span>
              </div>
            )}
          </div>
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
