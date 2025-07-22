"use client";

import { useEffect, useRef, useState } from "react";
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
import Image from "next/image";
import { processImageData } from "@/lib/processImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface EventCategory {
  _id?: string;
  eventName: string;
  categoryName: string;
  description: string;
  images: string[];
  price: number;
}

export default function EventCategoryPage() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EventCategory>({
    eventName: "",
    categoryName: "",
    description: "",
    images: [],
    price: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [eventOptions, setEventOptions] = useState<string[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>();
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => imageInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setForm((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    fetchEvents();
    fetchEventCategories();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("/api/events");
    const names = res.data.map((event: { name: string }) => event.name);
    setEventOptions(names);
  };

  const fetchEventCategories = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get("/api/event-category");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSave = async () => {
  if (isSaving) return; // prevent double clicks
  setIsSaving(true);

  try {
    const processedImages = await Promise.all(
      form.images.map((img) =>
        img.startsWith("data:image") || !img.startsWith("blob:")
          ? img
          : processImageData(img)
      )
    );

    const payload = { ...form, images: processedImages };

    if (editingId) {
      await axios.put(`/api/event-category/${editingId}`, payload);
    } else {
      await axios.post("/api/event-category", payload);
    }

    // Reset form and state
    setForm({
      eventName: "",
      categoryName: "",
      description: "",
      images: [],
      price: 0,
    });
    setEditingId(null);
    setOpen(false);
    fetchEventCategories();
  } catch (err) {
    console.error("Error saving category", err);
  } finally {
    setIsSaving(false); // Optional: or remove this line to keep it disabled
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
      await axios.delete(`/api/event-category/${deleteId}`);
      setDeleteOpen(false);
      fetchEventCategories();
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[17px] md:text-2xl font-semibold">
          Event Categories
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="text-white bg-indigo-600">Add New</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Event Category" : "Add Event Category"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>
                  Event Name<span className="text-red-500">*</span>
                </Label>{" "}
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
                <Label>
                  Category<span className="text-red-500">*</span>
                </Label>{" "}
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
              <div className="space-y-1">
                <Label>Images</Label>
                <Input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="flex flex-wrap gap-2 mt-2">
                  {form.images?.map((img, index) => (
                    <div key={index} className="relative">
                      <div className="w-16 h-16 rounded border overflow-hidden">
                        <Image
                          src={img}
                          alt={`Preview ${index}`}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      </div>
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <div
                    className="w-16 h-16 rounded border flex items-center justify-center bg-gray-100 cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <span className="text-gray-400 text-lg">+</span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  placeholder="Enter price"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                className="w-full"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
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

      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-gradient-to-br from-white via-gray-50 to-white">
        <Table className="min-w-full text-sm text-gray-800">
          <TableHeader className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Sr No
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Event
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Category
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Description
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Image
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Price
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-indigo-600 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100/70 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="px-4 py-3 font-medium text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 font-semibold">
                  {item.eventName}
                </TableCell>
                <TableCell className="px-4 py-3">{item.categoryName}</TableCell>
                <TableCell className="px-4 py-3 max-w-sm text-gray-600 whitespace-pre-wrap break-words">
                  {item.description}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Button
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      setSelectedImages(item.images || []);
                      setOpenImageDialog(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>

                <TableCell className="px-4 py-3 font-semibold text-gray-800">
                  ₹{item.price}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex gap-3 justify-end">
                    <Pencil
                      className="w-4 h-4 text-indigo-600 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handleEdit(item)}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-600 cursor-pointer hover:scale-110 transition-transform"
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
      {/* images diolog */}
      <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 bg-gray-50 rounded-lg overflow-hidden">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle className="text-indigo-600 text-lg sm:text-xl">
              Preview Images
            </DialogTitle>
          </DialogHeader>

          {selectedImages.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-[60vh] sm:h-[500px]"
            >
              {selectedImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`image-${idx}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-sm text-gray-400 text-center p-6">
              No images available.
            </p>
          )}
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="md:hidden space-y-4 text-center text-sm text-gray-500 py-6">
          Loading...
        </div>
      ) : (
        <div className="md:hidden space-y-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{item.categoryName}</h2>
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => {
                    setSelectedImages(item.images || []);
                    setOpenImageDialog(true);
                  }}
                >
                  View Images
                </Button>
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
      )}
    </div>
  );
}
