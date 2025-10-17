import { authFetch } from "~/features/auth/utils/authFetch";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7218";

export type ImageUploadResponse = {
  imageId: string;
  publicId: string;
  url: string;
  metadatosJson: string;
};

export type ImageUploadError = {
  message: string;
  status?: number;
};

/**
 * Upload an image to the API
 * @param file - Image file to upload
 * @returns Promise with image upload response
 * @throws ImageUploadError if upload fails
 */
export async function uploadImage(file: File): Promise<ImageUploadResponse> {
  try {
    // Create FormData and append the image
    const formData = new FormData();
    formData.append("image", file);

    // Use authFetch for authenticated upload
    const response = await authFetch(`${API_URL}/api/Image/upload`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw {
        message: errorText || "Failed to upload image",
        status: response.status,
      } as ImageUploadError;
    }

    const data: ImageUploadResponse = await response.json();
    return data;
  } catch (error) {
    if ((error as ImageUploadError).message) {
      throw error;
    }
    
    throw {
      message: "Network error while uploading image",
      status: 0,
    } as ImageUploadError;
  }
}
