import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import { useTerm } from "~/features/terms/hooks/useTerm";
import { useCategories } from "~/features/terms/hooks";
import { uploadImage } from "~/features/terms/utils/imageUpload";
import type { CreateTermRequest } from "~/features/terms/types";

// Zod schema for form validation
const editTermSchema = z.object({
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

type EditTermFormData = z.infer<typeof editTermSchema>;

export default function EditTerm() {
  const navigate = useNavigate();
  const params = useParams();
  const termId = params.term || "";
  
  const { user, isAuthenticated } = useAuthStore();
  const { editTerm, error: TermError } = useTermsStore();
  const { term, isLoading, error } = useTerm(termId);
  const { categories, isLoading: categoriesLoading } = useCategories();
  
  // State for image upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Check authorization
  const canEdit = isAuthenticated && user && term && user.userId === term.authorId;

  // Create categories options (remove "All Categories" and add empty option)
  const categoryOptions = [
    { value: "", label: "Select a category" },
    ...categories
      .filter(cat => cat !== "All Categories")
      .map(cat => ({ value: cat, label: cat }))
  ];

  
  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, navigate]);

  // Redirect if not authorized or term not found
  useEffect(() => {
    if (!isLoading && (!canEdit || !term)) {
      navigate("/terms");
    }
  }, [canEdit, isLoading, navigate, term]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditTermFormData>({
    resolver: zodResolver(editTermSchema),
    defaultValues: {
      name: term?.name || "",
      definition: term?.definition || "",
      category: term?.category || "",
      example: term?.example || "",
    },
    values: term ? {
      name: term.name,
      definition: term.definition,
      category: term.category,
      example: term.example,
    } : undefined,
  });

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    setUploadError(null);
  };

  const onSubmit = async (data: EditTermFormData) => {
    try {
      setIsUploading(true);
      setUploadError(null);

      let imageId: string | undefined = term?.imageId; // Keep existing imageId

      // Upload new image if selected
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
        audioId: null, // No audio upload in edit form for now
      };

      // Call API through store
      await editTerm(termId, termData);
      
      // Navigate back to term detail on success
      navigate(`/terms/${termId}`);
    } catch (error) {
      console.error("Failed to edit term:", TermError);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
          <Card className="animate-pulse">
            <CardHeader className="space-y-4">
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !term) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-sm text-red-800 dark:text-red-400">
              {error || "Term not found"}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/terms")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Terms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/terms/${termId}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Term
        </Button>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Edit Term</CardTitle>
            <CardDescription className="text-base">
              Update the economic term. All fields marked with * are required.
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
                  currentImageUrl={term?.image?.url}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/terms/${termId}`)}
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
                    {isUploading ? "Uploading..." : "Updating..."}
                  </>
                ) : (
                  "Update Term"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
