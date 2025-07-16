'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddServicePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    icon: '', // This will store base64 or file URL
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setForm({ ...form, icon: base64 });
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service Added:', form);
    router.push('/admin/services');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Event Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Icon Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} required />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded border"
            />
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
