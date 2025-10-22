import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import type { Route } from "./+types/create-term";
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

export function meta({}: Route.MetaArgs) {
  const baseUrl = "https://econodictionary.com";
  return [
    { 
      title: "Crear Nuevo Término - Diccionario Económico" 
    },
    { 
      name: "description", 
      content: "Agrega tu propio término económico al diccionario colaborativo. Comparte definiciones, ejemplos e imágenes para enriquecer el conocimiento financiero comunitario." 
    },
    { 
      property: "og:title", 
      content: "Contribuir al Diccionario - Crear Término Económico" 
    },
    { 
      property: "og:description", 
      content: "Suma tus conocimientos al diccionario económico colaborativo." 
    },
    { 
      property: "og:type", 
      content: "website" 
    },
    { 
      property: "og:url", 
      content: `${baseUrl}/terms/create` 
    },
    { 
      name: "robots", 
      content: "noindex, follow" 
    },
  ];
}
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
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener menos de 100 caracteres"),
  definition: z
    .string()
    .min(10, "La definición debe tener al menos 10 caracteres")
    .max(1000, "La definición debe tener menos de 1000 caracteres"),
  category: z.string().min(1, "Por favor selecciona una categoría"),
  example: z
    .string()
    .min(10, "El ejemplo debe tener al menos 10 caracteres")
    .max(500, "El ejemplo debe tener menos de 500 caracteres"),
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
    { value: "", label: "Selecciona una categoría" },
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
          Volver a Términos
        </Button>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Crear Nuevo Término</CardTitle>
            <CardDescription className="text-base">
              Agrega un nuevo término económico al diccionario. Todos los campos marcados con * son requeridos.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nombre del Término <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="p.ej., Inflación"
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
                  Categoría <span className="text-red-500">*</span>
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
                  Definición <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="definition"
                  placeholder="Proporciona una definición clara y concisa..."
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
                  Ejemplo <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="example"
                  placeholder="Proporciona un ejemplo práctico para ilustrar el término..."
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
                  Multimedia Opcional
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
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? "Cargando..." : "Creando..."}
                  </>
                ) : (
                  "Crear Término"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
