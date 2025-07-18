"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

interface Testimonial {
  _id?: string;
  name: string;
  message: string;
  videoUrl: string;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Submit or update testimonial
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    if (videoFile) {
      formData.append("video", videoFile);
    }

    const endpoint = editingId
      ? `/api/testimonials/${editingId}`
      : "/api/testimonials";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      body: formData,
    });

    if (res.ok) {
      alert(editingId ? "Updated successfully!" : "Uploaded successfully!");
      resetForm();
      fetchTestimonials();
    } else {
      alert("Failed to submit testimonial.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTestimonials();
      } else {
        alert("Failed to delete testimonial.");
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial._id || null);
    setName(testimonial.name);
    setMessage(testimonial.message);
    setVideoFile(null); // user may choose to upload new video
    setOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setMessage("");
    setVideoFile(null);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Video Testimonials</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setVideoFile(e.target.files?.[0] || null)
                }
                {...(!editingId && { required: true })}
              />
              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Submit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t._id}>
            <CardContent className="p-4">
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{t.message}</p>
              <video
                src={t.videoUrl}
                controls
                className="w-full h-48 object-cover rounded mb-2"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(t)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(t._id!)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
