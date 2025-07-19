"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { processImageData } from "@/lib/processImage";
import Image from "next/image";

interface EventCategory {
  _id?: string;
  eventName: string;
  categoryName: string;
  description: string;
  image: string;
  price: string;
}

export default function EventCategoryPage() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EventCategory>({
    eventName: "",
    categoryName: "",
    description: "",
    image: "",
    price: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [eventOptions, setEventOptions] = useState<string[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>();

  useEffect(() => {
    fetchEvents();
    fetchEventCategory();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("/api/events");
    const data = res?.data;
    const names = data.map((event: { name: string }) => event.name);
    setEventOptions(names);
  };

  const fetchEventCategory = async () => {
  try {
    const res = await fetch("/api/event-category");
    const data = await res.json();
    console.log("Fetched event categories:", data); // ← log the response
    if (Array.isArray(data)) {
      setCategories(data);
    } else {
      console.error("Expected array but got:", data);
      setCategories([]); // fallback to empty array to avoid crash
    }
  } catch (err) {
    console.error("Error fetching event categories", err);
    setCategories([]);
  }
};


  const handleSave = async () => {
    const icon = await processImageData(form.image);

    const payload = {
      ...form,
      image: icon,
    };

    try {
      if (editingId) {
        await fetch(`/api/event-category/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/event-category", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setForm({
        eventName: "",
        categoryName: "",
        description: "",
        image: "",
        price: "",
      });
      setEditingId(null);
      setOpen(false);
      fetchEventCategory();
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  const handleEdit = (item: EventCategory) => {
    setForm(item);
    setEditingId(item._id || null);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/event-category/${deleteId}`, {
        method: "DELETE",
      });
      setDeleteOpen(false);
      fetchEventCategory();
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Event Categories</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Event Category" : "Add Event Category"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Event Name</Label>
                <Select
                  value={form.eventName}
                  onValueChange={(value: string) =>
                    setForm({ ...form, eventName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event name" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventOptions.map((event) => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={form.categoryName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, categoryName: e.target.value })
                  }
                  placeholder="Enter category"
                />
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  value={form.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter description"
                  rows={4}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <Label>Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setForm({ ...form, image: imageUrl });
                    }
                  }}
                />
                {form.image && (
                  <div className="w-20 h-20 mt-2 border rounded overflow-hidden">
                    <Image
                      src={form.image}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized={true}
                    />
                  </div>
                )}
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  placeholder="Enter price"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button className="w-full" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action will permanently delete this event category.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr No</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.eventName}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell className="max-w-xs whitespace-pre-wrap">
                  {item.description}
                </TableCell>
                <TableCell>
                  {item.image && (
                    <div className="w-10 h-10 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt="icon"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-600 cursor-pointer"
                      onClick={() => {
                        setDeleteId(item._id);
                        setDeleteOpen(true);
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{item.categoryName}</h2>
              {item.image && (
                <div className="w-12 h-12 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt="icon"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    unoptimized={true}
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {item.description}
            </p>
            <div className="text-sm">
              <strong>Event:</strong> {item.eventName}
            </div>
            <div className="text-sm">
              <strong>Price:</strong> ₹{item.price}
            </div>
            <div className="flex gap-4 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(item)}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setDeleteId(item._id);
                  setDeleteOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}