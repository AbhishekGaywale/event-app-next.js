'use client';

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Calendar, MapPin, User, Phone } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  whatsapp: string;
  queryFor: string;
  date: string;
  location: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [contactNotifs, setContactNotifs] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContactNotifications = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setContactNotifs(data.contacts.reverse());
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  useEffect(() => {
    fetchContactNotifications();
    const interval = setInterval(fetchContactNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here are your latest updates.</p>
      </div>

      <Card className="p-6 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Recent Contact Queries
          </h2>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500">
            {contactNotifs.length} New
          </span>
        </div>

        {contactNotifs.length > 0 ? (
          <ul className="space-y-3">
            {contactNotifs.slice(0, 5).map((c) => (
              <li 
                key={c._id} 
                className="border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-800 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {c.queryFor}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContact(c)}
                        className="text-emerald-600 hover:text-emerald-700 border-emerald-500 hover:bg-emerald-50/50 dark:border-emerald-600 dark:text-emerald-500 dark:hover:bg-emerald-900/20"
                      >
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500">
                          <MessageSquare className="w-5 h-5" />
                          Contact Inquiry
                        </DialogTitle>
                      </DialogHeader>
                      {selectedContact && (
                        <div className="grid gap-4 py-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="p-2 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                                <User className="w-4 h-4" />
                              </span>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                                <p className="font-medium">{selectedContact.name}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                                <Phone className="w-4 h-4" />
                              </span>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">WhatsApp</p>
                                <p className="font-medium">{selectedContact.whatsapp}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                                <MessageSquare className="w-4 h-4" />
                              </span>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Query For</p>
                                <p className="font-medium">{selectedContact.queryFor}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                                <Calendar className="w-4 h-4" />
                              </span>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Event Date</p>
                                <p className="font-medium">{selectedContact.date || 'Not specified'}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="p-2 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30">
                                <MapPin className="w-4 h-4" />
                              </span>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                                <p className="font-medium">{selectedContact.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400">No contact queries yet</h3>
            <p className="text-sm text-gray-400 mt-1">New inquiries will appear here</p>
          </div>
        )}
      </Card>
    </div>
  );
}