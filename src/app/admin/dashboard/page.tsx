'use client';

import React from 'react';

interface Event {
  id: number;
  name: string;
  date: string; // ISO format
}

const upcomingEvents: Event[] = [
  { id: 1, name: 'Birthday Party – Arjun', date: '2025-07-20' },
  { id: 2, name: 'Baby Shower – Priya', date: '2025-07-22' },
  { id: 3, name: 'Haldi Ceremony – Raj', date: '2025-07-25' },
];

const notifications = [
  { id: 1, message: 'New query submitted from the contact form', time: '2 mins ago' },
  { id: 2, message: 'Service "Mehendi Decor" was edited', time: '1 hour ago' },
  { id: 3, message: 'Proposal booking confirmed', time: 'Today' },
];

export default function DashboardPage() {
  const today = new Date();

  const filteredEvents = upcomingEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl text-black font-bold">Dashboard</h1>
      <p className="text-black">Welcome to the admin panel dashboard.</p>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-black mb-4">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map((note) => (
              <li key={note.id} className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">
                <p className="text-blue-900">{note.message}</p>
                <p className="text-sm text-blue-700">{note.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications</p>
        )}
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-black mb-4">Upcoming Events</h2>
        {filteredEvents.length > 0 ? (
          <ul className="space-y-2">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded shadow-sm"
              >
                <strong>{event.name}</strong> – {new Date(event.date).toDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No upcoming events.</p>
        )}
      </div>
    </div>
  );
}
