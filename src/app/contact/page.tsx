"use client";

import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { X } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function ContactUsPage() {
  const [today, setToday] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    queryFor: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setToday(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setOpenModel(true);
        sessionStorage.setItem("popupShown", "true");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          whatsapp: "",
          queryFor: "",
          date: "",
          location: "",
        });
        setOpenModel(false);
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Network error or server not responding.");
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <h2 className="text-3xl font-bold text-[#6A005F] mb-4">Get in Touch</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border-b p-2 w-full outline-none bg-transparent text-gray-900"
      />

      <input
        type="text"
        name="whatsapp"
        placeholder="WhatsApp No"
        value={formData.whatsapp}
        onChange={handleChange}
        className="border-b p-2 w-full outline-none bg-transparent text-gray-900"
      />

      <input
        type="text"
        name="queryFor"
        placeholder="Query For"
        value={formData.queryFor}
        onChange={handleChange}
        className="border-b p-2 w-full outline-none bg-transparent text-gray-900"
      />

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Select Date</label>
        <input
          type="date"
          name="date"
          min={today}
          value={formData.date}
          onChange={handleChange}
          className="border-b p-3 outline-none text-gray-900 bg-transparent"
        />
      </div>

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="border-b p-2 w-full outline-none bg-transparent text-gray-900"
      />

      <button
        type="submit"
        className="bg-[#6A005F] text-white px-6 py-2 rounded-full hover:bg-[#4d324a] flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21l20.99-9L2.01 3v7l15 2-15 2z" />
        </svg>
        Submit
      </button>
    </form>
  );

  return (
    <>
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white max-w-3xl w-full mx-4 rounded-2xl relative shadow-2xl overflow-y-auto max-h-[90vh] p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setOpenModel(false)}
            >
              <X size={24} />
            </button>
            <div className={poppins.className}>{renderForm()}</div>
          </div>
        </div>
      )}

      <section
        className={`${poppins.className} bg-gradient-to-br from-[#fdfaf7] via-[#eaf5f5] to-[#ffffff] py-16 px-4`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="p-6 bg-transparent rounded-2xl">{renderForm()}</div>

          <div className="p-6 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Contact Details
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-xl text-[#6A005F]" />
                <span>+91 93590 30024</span>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-xl text-[#6A005F]" />
                <span>contact@kamblebrothers.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-xl text-[#6A005F]" />
                <span>Pune</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
