import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "~/features/shared/components/ui/button";
import { Label } from "~/features/shared/components/ui/label";

type ImageUploadProps = {
  onImageSelect: (file: File | null) => void;
  error?: string;
  currentImageUrl?: string; // URL of existing image (for edit mode)
};

export function ImageUpload({ onImageSelect, error, currentImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showCurrentImage, setShowCurrentImage] = useState(!!currentImageUrl);

  const validateFile = (file: File): string | null => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, or WebP)";
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "Image size must be less than 5MB";
    }

    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        onImageSelect(null);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFileName(file.name);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    setFileName(null);
    setShowCurrentImage(false);
    onImageSelect(null);
  }, [onImageSelect]);

  const handleReplaceCurrentImage = useCallback(() => {
    setShowCurrentImage(false);
  }, []);

  // Show current image if no new image is selected
  if (showCurrentImage && currentImageUrl && !preview) {
    return (
      <div className="space-y-2">
        <Label>Image</Label>
        <div className="relative border-2 border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
              <img
                src={currentImageUrl}
                alt="Current"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    Current image
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Click the button below to replace
                  </p>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReplaceCurrentImage}
                className="mt-3"
              >
                Replace Image
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          Keep the current image or upload a new one to replace it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload">Image (Optional)</Label>

      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
            }
            ${error ? "border-red-500" : ""}
          `}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Upload className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Drag and drop an image here, or click to browse
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                JPEG, PNG or WebP (max 5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                    {fileName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Ready to upload
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="flex-shrink-0 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <p className="text-xs text-zinc-500">
        The image will be uploaded when you create the term.
      </p>
    </div>
  );
}
