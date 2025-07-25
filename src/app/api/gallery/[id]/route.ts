import { NextResponse } from 'next/server';
import { getImageById, deleteImage } from '@/models/imageModel';

interface Params {
  params: {
    id: string;
  };
}

// GET single image
export async function GET(request: Request, { params }: Params) {
  try {
    const image = getImageById(params.id);
    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

// DELETE image
export async function DELETE(request: Request, { params }: Params) {
  try {
    const success = deleteImage(params.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Image deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}