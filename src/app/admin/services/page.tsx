"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
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
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { processImageData } from "@/lib/processImage";
import Image from "next/image";

interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
  images: string[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  console.log("services", services);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    images: [] as string[],
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    iconInputRef.current?.click();
  };

  const handleImagesClick = () => {
    imagesInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMultiple = false
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (isMultiple) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    } else if (files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, icon: imageUrl }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/events");
      // Ensure services is always an array, even if API returns null/undefined
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const openAddDialog = () => {
    setFormData({ name: "", description: "", icon: "", images: [] });
    setMode("add");
    setCurrentId(null);
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      icon: service.icon,
      images: service.images || [],
    });
    setCurrentId(service._id);
    setMode("edit");
    setDialogOpen(true);
  };
  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      // Process icon image
      const icon = formData.icon.startsWith("data:image")
        ? formData.icon // Already processed
        : formData.icon.startsWith("blob:")
        ? await processImageData(formData.icon)
        : formData.icon;

      // Process additional images - fixed the async/await in map
      const processedImages = await Promise.all(
        formData.images.map(async (img) => {
          // Added async here
          if (img.startsWith("data:image")) {
            return img; // Already processed
          } else if (img.startsWith("blob:")) {
            return await processImageData(img);
          } else {
            return img;
          }
        })
      );

      const payload = {
        name: formData.name,
        description: formData.description,
        icon,
        images: processedImages,
      };

      if (mode === "add") {
        await axios.post("/api/events", payload);
      } else if (mode === "edit" && currentId) {
        await axios.put(`/api/events/${currentId}`, payload);
      }

      setDialogOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Failed to save service:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsLoading(true);
      await axios.delete(`/api/events/${deleteId}`);
      setDeleteOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-[17px] md:text-2xl font-bold">Events</h1>
        <Button
          className=" shadow-[20px] text-white bg-indigo-600"
          onClick={openAddDialog}
        >
          Add New Event
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add Event" : "Edit Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Event Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter service name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full border rounded p-2"
                placeholder="Enter service description"
              />
            </div>
            <div>
              <Label>Icon Image</Label>
              <Input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                className="hidden"
              />
              {formData.icon ? (
                <div
                  className="w-16 h-16 mt-2 rounded border overflow-hidden cursor-pointer"
                  onClick={handleIconClick}
                >
                  <Image
                    src={formData.icon}
                    alt="Preview"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    unoptimized={true}
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 mt-2 rounded border flex items-center justify-center bg-gray-100 cursor-pointer"
                  onClick={handleIconClick}
                >
                  <span className="text-gray-400">+</span>
                </div>
              )}
            </div>
            <div>
              <Label>Additional Images</Label>
              <Input
                ref={imagesInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, true)}
                className="hidden"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <div className="w-16 h-16 rounded border overflow-hidden">
                      <Image
                        src={img}
                        alt={`Preview ${index}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized={true}
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
                  onClick={handleImagesClick}
                >
                  <span className="text-gray-400">+</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : mode === "add" ? "Save" : "Update"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action will permanently delete this Event.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
{/* table desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-gradient-to-br from-white via-gray-50 to-white">
        <Table className="min-w-full text-sm text-gray-800">
          <TableHeader className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Sr No
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Event Name
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Description
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Icon
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-indigo-600 font-semibold">
                Images
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-indigo-600 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service, index) => (
              <TableRow
                key={service._id}
                className="hover:bg-gray-100/70 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="px-4 py-3 font-medium text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 font-semibold">
                  {service.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-600 max-w-xs break-words whitespace-pre-wrap">
                  {service.description}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                    <Image
                      src={service.icon || "/placeholder-icon.svg"}
                      alt="icon"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-icon.svg";
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Button
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      setSelectedImages(service.images || []);
                      setOpenImageDialog(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>

                <TableCell className="px-4 py-3">
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => openEditDialog(service)}
                      className="p-2 rounded-full hover:bg-indigo-50 transition duration-200"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(service._id);
                        setDeleteOpen(true);
                      }}
                      className="p-2 rounded-full hover:bg-red-50 transition duration-200"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* images diolog */}
      <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Service Images</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 py-2">
            {selectedImages.length > 0 ? (
              selectedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-24 rounded-md overflow-hidden border border-gray-300 shadow-sm"
                >
                  <Image
                    src={img || "/placeholder-image.svg"}
                    alt={`image-${idx}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-image.svg";
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-3">
                No images available.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* mobile view */}
      <div className="md:hidden space-y-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <Image
                src={service.icon || ""}
                alt="icon"
                width={40}
                height={40}
                className="object-cover w-[40px] h-[40px]"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "";
                }}
              />
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {service.description}
            </p>
            <div className="flex gap-1 mt-1">
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => {
                  setSelectedImages(service.images || []);
                  setOpenImageDialog(true);
                }}
              >
                View Images
              </Button>
            </div>
            <div className="flex gap-4 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => openEditDialog(service)}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setDeleteId(service._id);
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
