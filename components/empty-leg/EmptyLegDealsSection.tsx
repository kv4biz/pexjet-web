// components/empty-leg/EmptyLegDealsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Users,
  Package,
  Clock,
  Gauge,
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  Plane,
  DollarSign,
  Clock4,
  Shield,
  Filter,
  SortAsc,
  Info,
} from "lucide-react";
import { emptyLegJets } from "../../data";
import { LoadingAnimation } from "../empty-leg/LoadingAnimation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export function EmptyLegDealsSection() {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeals, setShowDeals] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("best-discount");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchData, setSearchData] = useState<any>(null);
  const dealsPerPage = 10;

  // Check for stored search data on component mount
  useEffect(() => {
    const storedSearchData = sessionStorage.getItem("emptyLegSearchData");

    if (storedSearchData) {
      try {
        const data = JSON.parse(storedSearchData);
        setSearchData(data);
        setSearchPerformed(true);
        setIsLoading(true);
        setShowDeals(false);
        setCurrentPage(1);

        // Clear the stored data so it doesn't trigger again on refresh
        sessionStorage.removeItem("emptyLegSearchData");

        // Show loading animation for 7.5 seconds, then show deals
        setTimeout(() => {
          setIsLoading(false);
          setShowDeals(true);
          setShowAllDeals(true);

          // Scroll to deals section
          setTimeout(() => {
            const element = document.getElementById("empty-leg-deals-section");
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }, 7500);
      } catch (error) {
        console.error("Error parsing stored empty leg search data:", error);
      }
    }
  }, []);

  // Keep the existing event listener for backward compatibility
  useEffect(() => {
    const handleSearchSubmitted = (event: CustomEvent) => {
      const data = event.detail;
      setSearchData(data);
      setSearchPerformed(true);
      setIsLoading(true);
      setShowDeals(false);
      setCurrentPage(1);

      setTimeout(() => {
        setIsLoading(false);
        setShowDeals(true);
        setShowAllDeals(true);

        setTimeout(() => {
          const element = document.getElementById("empty-leg-deals-section");
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }, 7500);
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

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowDeals(true);
  };

  const handleSelectDeal = (deal: any) => {
    setSelectedDeal(deal);
    const event = new CustomEvent("emptyLegDealSelected", { detail: deal });
    window.dispatchEvent(event);
  };

  // Filter and sort deals - REMOVED search-based filtering
  const getFilteredAndSortedDeals = () => {
    let filteredDeals = [...emptyLegJets];

    // Only apply status filter, no search-based filtering
    if (statusFilter !== "all") {
      filteredDeals = filteredDeals.filter((deal) => {
        const availableSeats = deal.availableSeats;
        if (statusFilter === "open") return availableSeats > 0;
        if (statusFilter === "closing")
          return availableSeats > 0 && availableSeats <= 2;
        if (statusFilter === "closed") return availableSeats === 0;
        return true;
      });
    }

    // Sort deals
    switch (sortBy) {
      case "date-asc":
        filteredDeals.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "date-desc":
        filteredDeals.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "discount-desc":
        filteredDeals.sort((a, b) => {
          const discountA = parseInt(a.discount);
          const discountB = parseInt(b.discount);
          return discountB - discountA;
        });
        break;
      case "price-asc":
        filteredDeals.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filteredDeals.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceB - priceA;
        });
        break;
      case "best-discount":
      default:
        // Sort by discount percentage (highest first)
        filteredDeals.sort((a, b) => {
          const discountA = parseInt(a.discount);
          const discountB = parseInt(b.discount);
          return discountB - discountA;
        });
        break;
    }

    return filteredDeals;
  };

  const filteredAndSortedDeals = getFilteredAndSortedDeals();

  // Pagination logic
  const indexOfLastDeal = currentPage * dealsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
  const currentDeals = filteredAndSortedDeals.slice(
    indexOfFirstDeal,
    indexOfLastDeal
  );
  const totalPages = Math.ceil(filteredAndSortedDeals.length / dealsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of deals section when page changes
    const element = document.getElementById("empty-leg-deals-grid");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const DealCard = ({ deal }: { deal: any }) => {
    const getStatusBadge = () => {
      const availableSeats = deal.availableSeats;
      if (availableSeats === 0) {
        return { text: "Closed", color: "bg-gray-200" };
      } else if (availableSeats <= 2) {
        return { text: "Closing Soon", color: "bg-orange-200" };
      } else {
        return { text: "Open", color: "bg-green-500" };
      }
    };

    const status = getStatusBadge();

    return (
      <Card className="p-2 border md:border-r-8 border-gray-200 hover:border-[#D4AF37] transition-all cursor-pointer h-full">
        <div className="flex flex-col md:flex-row h-full gap-2">
          {/* Deal Image with Hover Card */}
          <div className="relative">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative cursor-help h-full group">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full md:w-48 h-48 lg:h-full object-cover "
                  />
                  {/* Translucent info icon overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm border border-[#D4AF37]/40 shadow-xl">
                <div className="space-y-3">
                  {/* Aircraft Header */}
                  <div className="flex items-start">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {deal.name}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {deal.jetType}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {deal.description}
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {deal.seats} seats
                        </div>
                        <div className="text-xs text-gray-500">Capacity</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {deal.luggage}
                        </div>
                        <div className="text-xs text-gray-500">Luggage</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {deal.speed}
                        </div>
                        <div className="text-xs text-gray-500">Speed</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {deal.range}
                        </div>
                        <div className="text-xs text-gray-500">Range</div>
                      </div>
                    </div>
                  </div>

                  {/* Cabin Dimensions */}
                  <div className="bg-gray-50 p-3 ">
                    <h5 className="font-semibold text-gray-900 text-sm mb-2">
                      Cabin Dimensions
                    </h5>
                    <div className="flex justify-between text-xs">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">Height</div>
                        <div className="text-gray-600">{deal.cabinHeight}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">Width</div>
                        <div className="text-gray-600">{deal.cabinWidth}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            {/* Discount Badge */}
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-semibold">
              {deal.discount}
            </div>
          </div>

          {/* Deal Details */}
          <div className="flex-1 w-full">
            {/* Flight Route */}
            <div className="bg-gray-50 p-2">
              <div className="flex items-center justify-between text-sm">
                <div className="text-center flex-1">
                  <div className="font-semibold text-gray-900">Departure</div>
                  <div className="text-gray-600">{deal.departure}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 justify-center mt-1">
                    <Calendar className="w-3 h-3" />
                    {deal.date} at {deal.time}
                  </div>
                </div>
                <div className="text-gray-400 mx-2">→</div>
                <div className="text-center flex-1">
                  <div className="font-semibold text-gray-900">Destination</div>
                  <div className="text-gray-600">{deal.destination}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Estimated arrival
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="flex flex-wrap gap-3 text-sm justify-between mx-5 ">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="font-medium">
                    {deal.availableSeats}/{deal.seats} seats
                  </div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="font-medium">{deal.flightTime}</div>
                  <div className="text-xs text-gray-500">Flight Time</div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold text-[#D4AF37]">{deal.price}</p>
                <div className="text-sm text-gray-500 line-through">
                  {deal.originalPrice}
                </div>
              </div>
            </div>
            {/* Aircraft Specifications - Mobile Only */}
            <div className="md:hidden mt-1 px-3 py-1 bg-gray-50">
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-sm">{deal.name}</h4>
                <p className="text-xs text-gray-600 capitalize">
                  {deal.jetType}
                </p>
              </div>
            </div>

            {/* Select Deal Button */}
            <div className="mt-auto pt-4">
              <Button
                onClick={() => handleSelectDeal(deal)}
                className="w-full bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90"
                disabled={deal.availableSeats === 0}
              >
                {deal.availableSeats === 0
                  ? "Fully Booked"
                  : "Select This Deal"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const FilterSection = () => (
    <div className="bg-white p-2 px-4 border border-gray-100 mb-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Filters</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Sort By */}
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Sort By:
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-discount">Best Discount</SelectItem>
                <SelectItem value="discount-desc">
                  Discount High to Low
                </SelectItem>
                <SelectItem value="date-asc">Date (Earliest)</SelectItem>
                <SelectItem value="date-desc">Date (Latest)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closing">Closing Soon</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedDeals.length} deals
          {searchPerformed && searchData && (
            <span className="text-xs text-gray-500 ml-2">
              (showing all available deals)
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const EmptyLegExplanation = () => (
    <div className="p-6 lg:sticky lg:top-16">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 lg:mb-2">
            What Are Empty Leg Flights?
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Massive Savings</h4>
              <p className="text-sm text-gray-600 mt-1">
                Save up to 75% on private jet flights when aircraft need to
                reposition. These are one-way flights with fixed routes and
                schedules.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock4 className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Flexible Travel</h4>
              <p className="text-sm text-gray-600 mt-1">
                Perfect for travelers with flexible schedules. Flight times and
                dates are predetermined but offer incredible value.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">
                Same Premium Experience
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Enjoy the same luxury, comfort, and service as regular private
                charters at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20  p-4">
          <h4 className="font-semibold text-gray-900 mb-2">How It Works</h4>
          <ol className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-[#D4AF37]">1.</span>
              <span>
                Private jets need to reposition for their next charter
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-[#D4AF37]">2.</span>
              <span>
                Instead of flying empty, they offer seats at huge discounts
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-[#D4AF37]">3.</span>
              <span>
                You get luxury private jet travel at commercial prices
              </span>
            </li>
          </ol>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            <strong>Note:</strong> Routes and schedules are fixed. Perfect for
            spontaneous travelers seeking luxury deals.
          </p>
        </div>
      </div>
    </div>
  );

  // Show best discount deals initially (first 3 deals from sorted list)
  const initialDealsToShow = showAllDeals
    ? currentDeals
    : filteredAndSortedDeals.slice(0, 3);
  const dealsToShow = searchPerformed ? currentDeals : initialDealsToShow;

  return (
    <section id="empty-leg-deals-section" className="py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Available Empty Leg Deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {searchPerformed && searchData
              ? `Showing all available empty leg deals (${filteredAndSortedDeals.length} total)`
              : "Discover incredible savings on pre-positioned private jets"}
          </p>
        </div>

        {/* Explanation ALWAYS Visible */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Right Column - Everything else */}
          <div className="lg:col-span-3">
            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-center items-center min-h-96">
                <LoadingAnimation onComplete={handleLoadingComplete} />
              </div>
            )}

            {/* Filter Section - Show when deals are visible */}
            {!isLoading && showDeals && filteredAndSortedDeals.length > 0 && (
              <FilterSection />
            )}

            {/* Deals Grid */}
            {!isLoading && showDeals && (
              <div id="empty-leg-deals-grid">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {dealsToShow.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>

                {/* Pagination - Only show when showing all deals and search performed */}
                {showAllDeals && searchPerformed && totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              currentPage > 1 &&
                              handlePageChange(currentPage - 1)
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              currentPage < totalPages &&
                              handlePageChange(currentPage + 1)
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            )}

            {/* No Results Message - This should rarely show now since we show all deals */}
            {!isLoading && showDeals && filteredAndSortedDeals.length === 0 && (
              <div className="text-center p-8 bg-white  border border-gray-200">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Deals Available
                </h3>
                <p className="text-gray-600 mb-4">
                  There are currently no empty leg deals matching your status
                  filter.
                </p>
                <Button
                  onClick={() => {
                    setStatusFilter("all");
                    setSortBy("best-discount");
                  }}
                  className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Search Prompt (only show when no search & no loading & initial state) */}
            {!searchPerformed && !isLoading && !showDeals && (
              <div className="text-center mt-12 p-8 bg-white  border border-gray-200">
                <MapPin className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Looking for Specific Routes?
                </h3>
                <p className="text-gray-600 mb-4">
                  Use the search form above to find empty leg deals for your
                  specific departure and destination
                </p>
              </div>
            )}
          </div>
          {/* Always visible left column */}
          <div className="lg:col-span-1">
            <EmptyLegExplanation />
          </div>
        </div>

        {/* Show More/Less Button - Only show when not in search mode */}
        {!searchPerformed && showDeals && filteredAndSortedDeals.length > 3 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAllDeals(!showAllDeals)}
              className="bg-[#D4AF37]"
            >
              {showAllDeals ? "Show Less Deals" : "View All Empty Leg Deals"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
