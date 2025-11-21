// components/charter/MultiStepFormSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { LoadingAnimation } from "./LoadingAnimation";
import { MultiStepForm } from "./MultiStepForm";
import { FlightSummary } from "./FlightSummary";
import { disclaimer } from "@/data";
import { Button } from "../ui/button";

export function MultiStepFormSection() {
  const [showForm, setShowForm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Listen for search form submission from HeroSection
  useEffect(() => {
    const handleSearchSubmitted = (event: CustomEvent) => {
      const searchData = event.detail;
      setFormData({ searchData });
      setShowLoading(true);
      setShowForm(false); // Ensure form is hidden when loading starts

      // After loading animation, show the form
      setTimeout(() => {
        setShowLoading(false);
        setShowForm(true);
        setCurrentStep(1);

        // Scroll to this section
        setTimeout(() => {
          const element = document.getElementById("multi-step-form-section");
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }, 8000);
    };

    window.addEventListener(
      "searchSubmitted",
      handleSearchSubmitted as EventListener
    );

    return () => {
      window.removeEventListener(
        "searchSubmitted",
        handleSearchSubmitted as EventListener
      );
    };
  }, []);

  // In MultiStepFormSection.tsx - these functions should properly merge data
  const handleStep1Next = (data: any) => {
    setFormData({ ...formData, ...data }); // This merges aircraft selection
    setCurrentStep(2);
  };

  const handleStep2Next = (data: any) => {
    setFormData({ ...formData, ...data }); // This merges contact info
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    console.log("Submitting charter request:", formData);
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowForm(false);
    setShowLoading(false);
    setCurrentStep(1);
    setFormData({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showForm && !showLoading) {
    return null; // Don't show anything until search is submitted
  }

  return (
    <section id="multi-step-form-section" className="py-16 bg-white">
      <div className="w-full lg:max-w-10/12 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Animation OR Multi-step Form (never both) */}
          <div className="lg:col-span-2">
            {showLoading && !showForm && (
              <LoadingAnimation
                onComplete={() => {
                  setShowLoading(false);
                  setShowForm(true);
                  setCurrentStep(1);
                }}
              />
            )}

            {showForm && !showLoading && (
              <MultiStepForm
                currentStep={currentStep}
                formData={formData}
                onStep1Next={handleStep1Next}
                onStep2Next={handleStep2Next}
                onStep2Back={handleStep2Back}
                onStep3Back={handleStep3Back}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Right Column - Flight Summary (Always shows when there's data) */}
          <div className="hidden lg:block lg:col-span-1">
            {(showLoading || showForm) && (
              <FlightSummary formData={formData} currentStep={currentStep} />
            )}
          </div>
        </div>

        {/* Success Modal with Disclaimer */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-8 border-b border-gray-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-gray-600">
                    Your charter request has been received. Our team will
                    contact you within 24 hours.
                  </p>
                </div>
              </div>

              {/* Disclaimer Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Charter Agreement Terms & Disclaimer
                  </h4>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    {disclaimer.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-sm leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                  <Button
                    onClick={handleModalClose}
                    variant={"link"}
                    className=""
                  >
                    I Understand & Close
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    By closing this window, you acknowledge you have read and
                    understood the terms above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
