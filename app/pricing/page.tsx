"use client";
import { pricings } from "@/utils/space";
import React, { useState, useEffect } from "react";
import { Pricing } from "../components/Pricing";

const PricingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center p-5 md:px-40 pb-10">
      <div className="rounded-md shadow-md p-5 md:p-10 gap-5 min-w-full justify-center items-center text-center bg-white bg-opacity-60">
        <h2 className="text-3xl text-primary mb-4">Pricing</h2>
        <p>Our pricing ensure everyone is satisfied</p>
      </div>

      {/* my spaces */}
      <div className="w-full px-5 md:p-10 text-center my-8 md:my-0">
        <h3 className="my-5 text-primary text-xl text-left">
          Our pricing plans
        </h3>
        <div className="w-ful grid grid-cols-1 md:grid-cols-2 gap-5">
          {pricings.map((pricing) => (
            <Pricing key={pricing.id} {...pricing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
