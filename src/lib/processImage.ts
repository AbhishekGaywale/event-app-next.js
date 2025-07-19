// src/lib/processImage.ts

export const processImageData = async (image: string): Promise<string> => {
  // If it's already a data URL or not a blob, return as-is
  if (image.startsWith("data:") || !image.startsWith("blob:")) {
    return image;
  }

  try {
    // Fetch the blob URL
    const response = await fetch(image);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read image data'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return image; // Return original if processing fails
  }
};