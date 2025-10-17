import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/features/shared/components/ui/card";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { Textarea } from "~/features/shared/components/ui/textarea";
import { Label } from "~/features/shared/components/ui/label";
import { Select } from "~/features/shared/components/ui/select";
import { ImageUpload } from "~/features/terms/components";
import { useTermsStore } from "~/features/terms/store/useTermsStore";
import { useAuthStore } from "~/features/auth/store/useAuthStore";
import { useCategories } from "~/features/terms/hooks";
import { uploadImage } from "~/features/terms/utils/imageUpload";
import type { CreateTermRequest } from "~/features/terms/types";
import { useEffect } from "react";

// Zod schema for form validation
const createTermSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  definition: z
    .string()
    .min(10, "Definition must be at least 10 characters")
    .max(1000, "Definition must be less than 1000 characters"),
  category: z.string().min(1, "Please select a category"),
  example: z
    .string()
    .min(10, "Example must be at least 10 characters")
    .max(500, "Example must be less than 500 characters"),
});

type CreateTermFormData = z.infer<typeof createTermSchema>;

export default function CreateTerm() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { createTerm } = useTermsStore();
  const { categories, isLoading: categoriesLoading } = useCategories();
  
  // State for image upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, navigate]);

  // Create categories options (remove "All Categories" and add empty option)
  const categoryOptions = [
    { value: "", label: "Select a category" },
    ...categories
      .filter(cat => cat !== "All Categories")
      .map(cat => ({ value: cat, label: cat }))
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTermFormData>({
    resolver: zodResolver(createTermSchema),
    defaultValues: {
      name: "",
      definition: "",
      category: "",
      example: "",
    },
  });

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    setUploadError(null);
  };

  const onSubmit = async (data: CreateTermFormData) => {
    try {
      setIsUploading(true);
      setUploadError(null);

      let imageId: string | undefined;

      // Upload image first if selected
      if (selectedImage) {
        try {
          const uploadResponse = await uploadImage(selectedImage);
          imageId = uploadResponse.imageId;
        } catch (error: any) {
          setUploadError(error.message || "Failed to upload image");
          setIsUploading(false);
          return;
        }
      }

      // Create term data with optional imageId
      const termData: CreateTermRequest = {
        name: data.name,
        definition: data.definition,
        category: data.category,
        example: data.example,
        ...(imageId && { imageId }),
      };

      // Call API through store
      await createTerm(termData);
      
      // Navigate back to terms list on success
      navigate("/terms");
    } catch (error) {
      console.error("Error creating term:", error);
      // Error is already set in store, form will show it
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/terms")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Terms
        </Button>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Create New Term</CardTitle>
            <CardDescription className="text-base">
              Add a new economic term to the dictionary. All fields marked with * are required.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Term Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Inflation"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  id="category"
                  {...register("category")}
                  aria-invalid={errors.category ? "true" : "false"}
                  disabled={categoriesLoading}
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat.value} value={cat.value} disabled={!cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Definition Field */}
              <div className="space-y-2">
                <Label htmlFor="definition">
                  Definition <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="definition"
                  placeholder="Provide a clear and concise definition..."
                  rows={5}
                  {...register("definition")}
                  aria-invalid={errors.definition ? "true" : "false"}
                />
                {errors.definition && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.definition.message}
                  </p>
                )}
              </div>

              {/* Example Field */}
              <div className="space-y-2">
                <Label htmlFor="example">
                  Example <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="example"
                  placeholder="Provide a practical example to illustrate the term..."
                  rows={4}
                  {...register("example")}
                  aria-invalid={errors.example ? "true" : "false"}
                />
                {errors.example && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.example.message}
                  </p>
                )}
              </div>

              {/* Optional Fields */}
              <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Optional Media
                </h3>

                <ImageUpload 
                  onImageSelect={handleImageSelect}
                  error={uploadError || undefined}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/terms")}
                className="w-full sm:w-auto"
                disabled={isSubmitting || isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? "Uploading..." : "Creating..."}
                  </>
                ) : (
                  "Create Term"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
