'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', icon: '' });

  useEffect(() => {
    // In real app, fetch data using id
    setForm({ name: 'Birthday', description: 'Edit Birthday', icon: '🎂' });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated service:', form);
    router.push('/admin/services');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Edit Service #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Event Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </div>
        <div>
          <Label>Icon</Label>
          <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} required />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
