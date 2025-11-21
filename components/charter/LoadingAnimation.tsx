// components/charter/LoadingAnimation.tsx
"use client";

import React, { useEffect } from "react";
import { AnimatedList } from "../ui/animated-list";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const items = [
    {
      key: "distance",
      title: "Calculating Distance",
      description: "Measuring optimal flight path...",
      icon: "📐",
    },
    {
      key: "availability",
      title: "Checking Aircraft Availability",
      description: "Searching our fleet database...",
      icon: "✈️",
    },
    {
      key: "pricing",
      title: "Calculating Best Prices",
      description: "Finding competitive rates...",
      icon: "💰",
    },
    {
      key: "jets",
      title: "Matching Available Jets",
      description: "Selecting perfect aircraft for your journey...",
      icon: "🛩️",
    },
    {
      key: "complete",
      title: "Ready to Go!",
      description: "Found the best options for you",
      icon: "✅",
    },
  ];

  // Auto-complete when all items are shown
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 7500); // Slightly longer than the animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative mx-auto lg:items-start h-100 w-[400px] cursor-pointer overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Finding Your Perfect Jet</h3>
        <p className="text-gray-600">We're searching our global network</p>
      </div>

      <AnimatedList delay={1500} className="w-full">
        {items.map((item, index) => (
          <div
            key={item.key}
            className="flex items-center gap-2 p-4 bg-gray-50 border border-gray-100"
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            {index === items.length - 1 && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            )}
          </div>
        ))}
      </AnimatedList>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Preparing your options...
        </div>
      </div>
    </div>
  );
}
