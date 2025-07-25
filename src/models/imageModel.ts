import { promises as fs } from 'fs';
import path from 'path';

export interface Image {
  id: string;
  filename: string;
  path: string;
  createdAt: Date;
  title?: string;
  description?: string;
}

// Empty initial array
let images: Image[] = [];

export const getImages = (): Image[] => images;

export const getImageById = (id: string): Image | undefined =>
  images.find(img => img.id === id);

export const addImage = (image: Omit<Image, 'id' | 'createdAt'>): Image => {
  const newImage: Image = {
    ...image,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  images.push(newImage);
  return newImage;
};

export const deleteImage = async (id: string): Promise<boolean> => {
  const index = images.findIndex(img => img.id === id);
  if (index === -1) return false;

  const image = images[index];
  try {
    const filePath = path.join(process.cwd(), 'public', image.path);
    await fs.unlink(filePath);
  } catch (err) {
    console.error('Error deleting image file:', err);
  }

  images.splice(index, 1);
  return true;
};
