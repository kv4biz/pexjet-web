// components/charter/AircraftSelection.tsx
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Check,
  Users,
  Package,
  Clock,
  ArrowRight,
  Gauge,
  Navigation,
  Eye,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { localJets, internationalJets } from "../../data/charter";

interface AircraftSelectionProps {
  formData: any;
  onNext: (data: any) => void;
}

export function AircraftSelection({
  formData,
  onNext,
}: AircraftSelectionProps) {
  const [selectedAircraft, setSelectedAircraft] = useState<string[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string>("local");

  const handleSelectAircraft = (aircraftId: string) => {
    setSelectedAircraft((prev) => {
      if (prev.includes(aircraftId)) {
        return prev.filter((id) => id !== aircraftId);
      } else if (prev.length < 5) {
        return [...prev, aircraftId];
      }
      return prev;
    });
  };

  const getSelectedAircraftDetails = () => {
    const allAircraft = [...localJets, ...internationalJets];
    return selectedAircraft
      .map((id) => allAircraft.find((a) => a.id === id))
      .filter((a): a is (typeof allAircraft)[0] => Boolean(a));
  };

  const handleContinue = () => {
    if (selectedAircraft.length > 0) {
      const selected = getSelectedAircraftDetails();
      onNext({ selectedAircraft: selected });
    }
  };

  const AircraftRow = ({
    aircraft,
    isSelected,
  }: {
    aircraft: any;
    isSelected: boolean;
  }) => (
    <div
      className={`grid grid-cols-8 lg:grid-cols-12 gap-2 p-2 border-b border-gray-200 cursor-pointer transition-all ${
        isSelected
          ? "bg-[#D4AF37]/5 border-l-4 border-l-[#D4AF37]"
          : "hover:bg-gray-50"
      }`}
      onClick={() => handleSelectAircraft(aircraft.id)}
    >
      {/* Aircraft Name & Selection */}
      <div className="col-span-5 lg:col-span-3 flex items-center gap-3">
        <div
          className={`w-3 h-3 border flex items-center justify-center ${
            isSelected ? "bg-[#D4AF37] border-[#D4AF37]" : "border-gray-300"
          }`}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{aircraft.name}</div>
          <div className="text-xs text-gray-500">{aircraft.description}</div>
        </div>
      </div>

      {/* Seats */}
      <div className="col-span-1 hidden lg:flex items-center gap-1 text-sm text-gray-600">
        <Users className="w-4 h-4" />
        <span>{aircraft.seats}</span>
      </div>

      {/* Luggage */}
      <div className="col-span-1 hidden lg:flex items-center gap-1 text-sm text-gray-600">
        <Package className="w-4 h-4" />
        <span>{aircraft.luggage.split(" ")[0]}</span>
      </div>

      {/* Speed */}
      <div className="col-span-2  hidden lg:flex items-center gap-1 text-sm text-gray-600">
        <Gauge className="w-4 h-4" />
        <span>{aircraft.speed}</span>
      </div>

      {/* Range */}
      <div className="col-span-2  hidden lg:flex  items-center gap-1 text-sm text-gray-600">
        <Navigation className="w-4 h-4" />
        <span>{aircraft.range}</span>
      </div>

      {/* Flight Time */}
      <div className="col-span-1 flex items-center gap-1 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>{aircraft.flightTime}</span>
      </div>

      {/* Price */}
      <div className="col-span-1 text-right">
        <div className="font-bold text-[#D4AF37]">{aircraft.price}</div>
        <div className="text-xs text-gray-500">per leg</div>
      </div>

      {/* Image Hover */}
      <div className="col-span-1 flex justify-end">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <img
                src={aircraft.image}
                alt={aircraft.name}
                className="w-full h-48 object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{aircraft.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {aircraft.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-500">
                  <div>Cabin Height: {aircraft.cabinHeight}</div>
                  <div>Cabin Width: {aircraft.cabinWidth}</div>
                  <div>Speed: {aircraft.speed}</div>
                  <div>Range: {aircraft.range}</div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );

  const TableHeader = () => (
    <div className="grid grid-cols-8 lg:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
      <div className=" col-span-5 lg:col-span-3">Aircraft</div>
      <div className="col-span-1 hidden lg:block">Seats</div>
      <div className="col-span-1 hidden lg:block">Luggage</div>
      <div className="col-span-2 hidden lg:block">Speed</div>
      <div className="col-span-2 hidden lg:block">Range</div>
      <div className="col-span-1">Time</div>
      <div className="col-span-1 text-right">Price</div>
      <div className="col-span-1 text-right">View</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Your Preferred Aircraft
        </h2>
        <p className="text-gray-600">
          Choose up to 5 aircraft for comparison. We'll provide you with the
          best options.
        </p>
        <div className="mt-2 text-sm text-gray-500">
          Selected: {selectedAircraft.length}/5 aircraft
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        value={openAccordion}
        onValueChange={setOpenAccordion}
        className="space-y-4"
      >
        {/* Local Jets Accordion */}
        <AccordionItem
          value="local"
          className="border border-gray-200 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-gray-50">
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold text-lg">Local & Regional Jets</p>
              <p className="text-sm hidden lg:block text-gray-500">
                Perfect for domestic and regional flights
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="bg-white">
              <TableHeader />
              <div className="max-h-96 overflow-y-auto">
                {localJets.map((aircraft) => (
                  <AircraftRow
                    key={aircraft.id}
                    aircraft={aircraft}
                    isSelected={selectedAircraft.includes(aircraft.id)}
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* International Jets Accordion */}
        <AccordionItem
          value="international"
          className="border border-gray-200  overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-gray-50">
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold text-lg">
                International & Long-Range Jets
              </p>
              <p className="text-sm hidden lg:block text-gray-500">
                Ideal for intercontinental and long-haul flights
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="bg-white">
              <TableHeader />
              <div className="max-h-96 overflow-y-auto">
                {internationalJets.map((aircraft) => (
                  <AircraftRow
                    key={aircraft.id}
                    aircraft={aircraft}
                    isSelected={selectedAircraft.includes(aircraft.id)}
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Selected Aircraft Preview */}
      {selectedAircraft.length > 0 && (
        <Card className="p-4 border-[#D4AF37]/20 bg-[#D4AF37]/5">
          <h4 className="font-semibold text-gray-900 lg:mb-3">
            Selected Aircraft ({selectedAircraft.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {getSelectedAircraftDetails().map((aircraft) => (
              <div
                key={aircraft.id}
                className="flex items-center gap-2 p-1 lg:px-3 lg:py-2 border border-[#D4AF37]"
              >
                <span className="text-sm">{aircraft.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAircraft(aircraft.id);
                  }}
                  className="text-gray-400 hover:text-red-500 text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleContinue}
          variant={"outline"}
          disabled={selectedAircraft.length === 0}
          className="bg-[#D4AF37] "
        >
          Continue ({selectedAircraft.length} selected)
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
