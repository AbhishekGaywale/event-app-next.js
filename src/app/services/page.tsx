"use client";

import React, { useEffect, useState } from "react";
import EventCategoryCard from "../components/EventCard";
import axios from "axios";

interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  price?: number;
}

export default function ServicePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/events");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-10 px-2 min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-600">Loading Events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-10 px-2 min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-center sm:text-3xl font-serif text-[#51A4A8] mb-7 tracking-tight">
          — Our Event Services
        </h2>
        <p className="text-gray-700 text-2xl max-w-2xl text-center font-serif mx-auto mb-12">
          Whether its a birthday, wedding, baby shower, or corporate event, we
          create unforgettable experiences tailored to your vision.
        </p>
        
        <EventCategoryCard services={services} />

        {services.length > 8 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-block px-6 py-3 bg-sky-100 text-sky-800 font-medium rounded-full hover:scale-105 transition-all duration-300"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}