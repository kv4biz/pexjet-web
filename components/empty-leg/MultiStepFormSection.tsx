// components/empty-leg/MultiStepFormSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { MultiStepForm } from "./MultiStepForm";
import { FlightDetails } from "./FlightDetails";
import { emptyLegDisclaimer } from "../../data/empty-leg";
import { Button } from "../ui/button";

export function MultiStepFormSection() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  // Listen for deal selection
  useEffect(() => {
    const handleDealSelected = (event: CustomEvent) => {
      const deal = event.detail;
      setSelectedDeal(deal);
      setFormData((prev: any) => ({
        ...prev,
        selectedAircraft: deal,
      }));
      setShowForm(true);
      setCurrentStep(1); // Start at contact form

      // Scroll to form section
      setTimeout(() => {
        const element = document.getElementById("empty-leg-form-section");
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    };

    window.addEventListener(
      "emptyLegDealSelected",
      handleDealSelected as EventListener
    );

    return () => {
      window.removeEventListener(
        "emptyLegDealSelected",
        handleDealSelected as EventListener
      );
    };
  }, []);

  // Listen for search form submission (to store search data)
  useEffect(() => {
    const handleSearchSubmitted = (event: CustomEvent) => {
      const searchData = event.detail;
      setFormData((prev: any) => ({ ...prev, searchData }));
    };

    window.addEventListener(
      "emptyLegSearchSubmitted",
      handleSearchSubmitted as EventListener
    );

    return () => {
      window.removeEventListener(
        "emptyLegSearchSubmitted",
        handleSearchSubmitted as EventListener
      );
    };
  }, []);

  const handleStep1Next = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Next = (data: any) => {
    setFormData({ ...formData, contactInfo: data });
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    console.log("Submitting empty leg request:", formData);
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowForm(false);
    setCurrentStep(1);
    setFormData({});
    setSelectedDeal(null);
  };

  // Don't render anything until a deal is selected
  if (!showForm) {
    return null;
  }

  return (
    <section id="empty-leg-form-section" className="py-16 bg-white">
      <div className="w-full lg:max-w-10/12 mx-auto px-4">
        <div className="flex lg:gap-8">
          {/* Left Column - Multi-step Form */}
          <div className="lg:w-2/3 w-full">
            <MultiStepForm
              currentStep={currentStep}
              formData={formData}
              onStep1Next={handleStep1Next}
              onStep2Next={handleStep2Next}
              onStep2Back={handleStep2Back}
              onStep3Back={handleStep3Back}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Column - Flight Details */}
          <div className="lg:w-1/3">
            {selectedDeal && (
              <FlightDetails
                selectedDeal={selectedDeal}
                searchData={formData.searchData}
              />
            )}
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Empty Leg Request Submitted!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your empty leg request has been received. Our team will
                    contact you within <strong>24-48 hours</strong>.
                  </p>
                </div>
              </div>

              {/* Disclaimer Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-center">
                    Important Empty Leg Terms
                  </h4>
                  <div className="text-xs text-gray-600 space-y-2 max-h-60 overflow-y-auto">
                    {emptyLegDisclaimer
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <div key={index}>
                          {paragraph.split("\n").map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-1 leading-relaxed">
                              {line.trim()}
                            </p>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                  <Button onClick={handleModalClose} variant={"link"}>
                    I Understand & Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
