import { Link, useParams, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/features/shared/components/ui/card";
import { Badge } from "~/features/shared/components/ui/badge";
import { Button } from "~/features/shared/components/ui/button";
import { useTerm } from "~/features/terms/hooks/useTerm";
import { useTermsStore } from "~/features/terms/store/useTermsStore";
import { useAuthStore } from "~/features/auth/store/useAuthStore";


export default function TermDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // API base URL for media
  const API_URL = import.meta.env.VITE_API_URL;

  const { term, isLoading, error } = useTerm(params.term || "");
  const { removeTerm } = useTermsStore();
  const { user, isAuthenticated } = useAuthStore();
  
  // Check if current user is the author
  const canEdit = isAuthenticated && user && term && user.id === term.authorId;
  
  const handleDelete = async () => {
    if (!term) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${term.name}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setIsDeleting(true);
    try {
      await removeTerm(term.id);
      navigate("/terms");
    } catch (error) {
      console.error("Failed to delete term:", error);
      alert("Failed to delete term. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          <Card className="animate-pulse">
            <CardHeader className="space-y-4">
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
          </div>
          <Link to="/terms" className="inline-block">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Terms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!term) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Term not found</h2>
          <Link to="/terms" className="mt-4 inline-block">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Terms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusVariant = term.isApproved ? "success" : "warning";
  const StatusIcon = term.isApproved ? CheckCircle : Clock;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Back Button */}
        <Link to="/terms" className="mb-6 inline-block">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Terms
          </Button>
        </Link>

        {/* Main Card */}
        <Card>
          <CardHeader className="space-y-4">
            {/* Title and Status */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl">
                {term.name}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariant} className="w-fit">
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {term.isApproved ? "Approved" : "Pending"}
                </Badge>
                
                {/* Edit and Delete buttons - only show if user is the author */}
                {canEdit && (
                  <div className="flex gap-2">
                    <Link to={`/terms/${term.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Category Badge */}
            {term.category && (
              <Badge variant="secondary" className="w-fit text-sm">
                {term.category}
              </Badge>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Created {new Date(term.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {term.updatedAt !== term.createdAt && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    Updated {new Date(term.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Definition */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Definition
              </h3>
              <p className="text-base leading-relaxed text-zinc-900 dark:text-zinc-50 sm:text-lg">
                {term.definition}
              </p>
            </div>

            {/* Example */}
            {term.example && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Example
                </h3>
                <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                    {term.example}
                  </p>
                </div>
              </div>
            )}

            {/* Media */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Media
              </h3>
              <div className="flex flex-col gap-4">
                {term.imageId ? (
                  <img
                    src={`${API_URL}/api/media/${term.imageId}`}
                    alt={term.name}
                    className="rounded shadow-sm max-w-full"
                  />
                ) : (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">No image available</p>
                )}
                {term.audioId ? (
                  <audio
                    controls
                    src={`${API_URL}/api/media/${term.audioId}`}
                    className="w-full"
                  />
                ) : (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">No audio available</p>
                )}
              </div>
            </div>
   
             {/* Approval Info */}
            {term.isApproved && term.approvedAt && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Approved</span>
                </div>
                <p className="mt-1 text-sm text-green-700 dark:text-green-500">
                  Approved on {new Date(term.approvedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Rejection Info */}
            {!term.isApproved && term.rejectionReason && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
                  <XCircle className="h-5 w-5" />
                  <span className="font-semibold">Rejected</span>
                </div>
                <p className="mt-2 text-sm text-red-700 dark:text-red-500">
                  {term.rejectionReason}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
