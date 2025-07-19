"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import EventCategoryCard from "@/app/components/EventCategoryCard";

interface Service {
  _id: string;
  name: string;
  description: string;
  images: string[]; // Changed to array of images
  highlights?: string[];
}

interface EventCategory {
  _id: string;
  eventName: string;
  categoryName: string;
  description: string;
  image: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch service details
        const serviceRes = await axios.get(`/api/events/${params.id}`);
        setService({
          ...serviceRes.data,
          images: Array.isArray(serviceRes.data.images)
            ? serviceRes.data.images
            : [serviceRes.data.images || "/default-service.jpg"],
          highlights: serviceRes.data.highlights || [
            "Custom decoration design",
            "Professional setup",
            "Quality materials",
            "Personalized consultation",
          ],
        });

        // Fetch event categories
        const categoriesRes = await axios.get("/api/event-category");
        setCategories(
          Array.isArray(categoriesRes.data) ? categoriesRes.data : []
        );
      } catch (error) {
        console.error("Error fetching data", error);
        router.push("/services");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#51A4A8]"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Service not found
        </h1>
        <button
          onClick={() => router.push("/services")}
          className="bg-[#51A4A8] text-white px-6 py-2 rounded-lg hover:bg-[#3e8a8e] transition"
        >
          Browse Our Services
        </button>
      </div>
    );
  }

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full ">
        <Image
          src="/slide/design_05.jpg" // Added leading slash for absolute path
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="100vw" // Added for better performance
        />
        <div className="absolute inset-0   bg-opacity-30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif tracking-wide">
              {service.name}
            </h1>
            <div className="w-20 h-1 bg-[#51A4A8] mx-auto mb-6"></div>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg mb-4">
              <Image
                src={service.images[currentImageIndex]}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            {service.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {service.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-24 rounded-md overflow-hidden transition-all ${
                      currentImageIndex === index
                        ? "ring-4 ring-[#51A4A8]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${service.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Content */}
          <div className="lg:w-1/2">
            <button
              onClick={() => router.back()}
              className="mb-6 text-[#51A4A8] hover:text-[#3e8a8e] flex items-center font-medium"
            >
              ← Back to Services
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">
              About This Service
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {service.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 font-serif">
                Service Highlights
              </h3>
              <ul className="space-y-3">
                {service.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#51A4A8] mt-1 mr-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="bg-[#51A4A8] hover:bg-[#3e8a8e] text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book This Service
            </button>
          </div>
        </div>

        {/* Related Event Categories */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-3">
              Perfect For These Events
            </h2>
            <div className="w-20 h-1 bg-[#51A4A8] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            {categories.map((category) => (
              <EventCategoryCard
                key={category._id}
                _id={category._id}
                eventName={category.eventName}
                categoryName={category.categoryName}
                description={category.description}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
