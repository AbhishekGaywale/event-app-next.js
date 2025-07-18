'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
    <div className=" sm:p-8 space-y-10">
      <p className="text-lg text-muted-foreground">Welcome! Here are your latest updates.</p>

      <Card className="p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-green-800"> Recent Contact Queries</h2>

        {contactNotifs.length > 0 ? (
          <ul className="space-y-4">
            {contactNotifs.slice(0, 5).map((c) => (
              <li key={c._id} className="border-l-4 border-green-500 bg-green-50 rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-900">
                      <span className="font-semibold">{c.name}</span> queried for <strong>{c.queryFor}</strong>
                    </p>
                    <p className="text-sm text-green-700">📅 {new Date(c.createdAt).toLocaleString()}</p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedContact(c)}
                        className="text-green-700 border-green-600 hover:bg-green-100"
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-green-800">Contact Details</DialogTitle>
                      </DialogHeader>
                      {selectedContact && (
                        <div className="space-y-2 text-sm text-gray-800">
                          <p><strong>Name:</strong> {selectedContact.name}</p>
                          <p><strong>WhatsApp:</strong> {selectedContact.whatsapp}</p>
                          <p><strong>Query For:</strong> {selectedContact.queryFor}</p>
                          <p><strong>Event Date:</strong> {selectedContact.date}</p>
                          <p><strong>Location:</strong> {selectedContact.location}</p>
                          <p><strong>Submitted At:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No contact form notifications yet.</p>
        )}
      </Card>
    </div>
  );
}
