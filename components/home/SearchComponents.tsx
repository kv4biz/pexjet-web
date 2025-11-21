"use client";

import CharterSearch from "./CharterSearch";
import EmptyLegSearch from "./EmptyLegSearch";

export default function SearchComponents() {
  return (
    <div className="pt-10 bg-[#F7F7F7]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:-mt-40 relative z-20 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          {/* Left Side - Charter Search */}
          <div>
            <CharterSearch />
          </div>

          {/* Right Side - Empty Leg Search */}
          <div>
            <EmptyLegSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
