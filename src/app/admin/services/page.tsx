'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Birthday', description: 'Birthday party decor', icon: '🎂' },
    { id: 2, name: 'Wedding', description: 'Wedding decorations', icon: '💍' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/admin/services/add">
          <Button>Add New Event</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.icon}</TableCell>
              <TableCell>
                <Link href={`/admin/services/edit/${service.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
