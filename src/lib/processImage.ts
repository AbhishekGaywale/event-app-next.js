// src/lib/processImage.ts

export const processImageData = async (image: string): Promise<string> => {
  if (!image.startsWith("blob:")) return image;

  const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
  const file = fileInput?.files?.[0];

  if (!file) return image;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};
