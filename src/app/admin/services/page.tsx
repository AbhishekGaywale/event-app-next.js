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
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { processImageData } from "@/lib/processImage";

interface Service {
  _id: string; // MongoDB ID
  name: string;
  description: string;
  icon: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get("/api/events");
    setServices(res.data);
  };

  const openAddDialog = () => {
    setFormData({ name: "", description: "", icon: "" });
    setMode("add");
    setCurrentId(null);
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      icon: service.icon,
    });
    setCurrentId(service._id);
    setMode("edit");
    setDialogOpen(true);
  };

  const handleSave = async () => {
  const icon = await processImageData(formData.icon);

  const payload = {
    name: formData.name,
    description: formData.description,
    icon: icon,
  };

  if (mode === "add") {
    await axios.post("/api/events", payload);
  } else if (mode === "edit" && currentId !== null) {
    await axios.put(`/api/events/${currentId}`, payload);
  }

  setDialogOpen(false);
  setFormData({ name: "", description: "", icon: "" });
  setCurrentId(null);
  fetchServices();
};

  const handleDelete = async () => {
    if (deleteId) {
      await axios.delete(`/api/events/${deleteId}`); // ✅ Updated
      setDeleteOpen(false);
      fetchServices();
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-xl md:text-2xl font-bold">Services</h1>
        <Button variant="outline" onClick={openAddDialog}>
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
                placeholder="Enter event description"
              />
            </div>
            <div>
              <Label>Icon Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setFormData({ ...formData, icon: imageUrl });
                  }
                }}
              />
              {formData.icon && (
                <img
                  src={formData.icon}
                  alt="Preview"
                  className="w-16 h-16 mt-2 rounded border object-cover"
                />
              )}
            </div>
            <DialogFooter>
              <Button className="w-full" onClick={handleSave}>
                {mode === "add" ? "Save" : "Update"}
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
          <p>This action will permanently delete this event.</p>
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
            <TableRow className="bg-gray-100">
              <TableHead>Sr No</TableHead>
              <TableHead>Event Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell className="max-w-sm break-words whitespace-pre-wrap">
                  {service.description}
                </TableCell>
                <TableCell>
                  <img
                    src={service.icon}
                    alt="icon"
                    className="w-10 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="w-4 h-4 cursor-pointer text-blue-600"
                      onClick={() => openEditDialog(service)}
                    />
                    <Trash2
                      className="w-4 h-4 cursor-pointer text-red-600"
                      onClick={() => {
                        setDeleteId(service._id);
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
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <img
                src={service.icon}
                alt="icon"
                className="w-12 h-12 object-cover rounded"
              />
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {service.description}
            </p>
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
