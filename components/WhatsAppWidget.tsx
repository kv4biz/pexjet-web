// components/WhatsAppWidget.tsx
"use client";

import { useState } from "react";
import { FaWhatsapp, FaComment, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SimpleWhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "1234567890"; // Replace with your number
  const defaultMessage = "Hello! I would like to get more information.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Main Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 flex justify-center text-white items-center rounded-full bg-green-500 hover:bg-[#D4AF37] shadow-lg transition-all duration-300"
      >
        {isOpen ? (
          <FaTimes className="h-7 w-7" />
        ) : (
          <FaWhatsapp className="h-9 w-9" />
        )}
      </div>

      {/* Chat Card */}
      {isOpen && (
        <Card className="absolute bottom-16 left-0 w-80 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaWhatsapp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp Support</h3>
                <p className="text-sm text-gray-500">Online now</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Need help? Chat with us on WhatsApp for quick assistance.
            </p>

            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-[#D4AF37]"
            >
              <FaComment className="h-4 w-4 mr-2" />
              Start Conversation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleWhatsAppWidget;
