// components/empty-leg/MultiStepForm.tsx
"use client";
import { Check } from "lucide-react";
import { Card } from "../ui/card";
import { ContactForm } from "./ContactForm";
import { FinalReview } from "./FinalReview";

interface MultiStepFormProps {
  currentStep: number;
  formData: any;
  onStep1Next: (data: any) => void;
  onStep2Next: (data: any) => void;
  onStep2Back: () => void;
  onStep3Back: () => void;
  onSubmit: () => void;
}

export function MultiStepForm({
  currentStep,
  formData,
  onStep1Next,
  onStep2Next,
  onStep2Back,
  onStep3Back,
  onSubmit,
}: MultiStepFormProps) {
  const steps = [
    { number: 1, title: "Contact Details", completed: currentStep > 1 },
    { number: 2, title: "Review & Submit", completed: false },
  ];

  // Adjust current step since we removed aircraft selection
  const adjustedStep = currentStep - 1;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    adjustedStep >= step.number
                      ? "bg-[#D4AF37] border-[#D4AF37] text-white"
                      : "border-gray-300 text-gray-300"
                  }`}
                >
                  {step.completed ? <Check className="w-6 h-6" /> : step.number}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    adjustedStep >= step.number
                      ? "text-[#D4AF37]"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 ${
                    adjustedStep > step.number ? "bg-[#D4AF37]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="border w-full border-[#D4AF37]/20 p-6 bg-white/95 backdrop-blur-sm">
        {currentStep === 1 && (
          <ContactForm
            formData={formData}
            onNext={onStep1Next}
            onBack={onStep2Back}
          />
        )}

        {currentStep === 2 && (
          <FinalReview
            formData={formData}
            onSubmit={onSubmit}
            onBack={onStep3Back}
          />
        )}
      </Card>
    </div>
  );
}
