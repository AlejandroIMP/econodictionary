export interface ImageDto {
  id: string;
  publicId: string;
  url: string;
  metadatosJson: string;
  metadataSatus: number;
  createdAt: string;
  updatedAt: string;
}

export interface Term {
  id: string;
  name: string;
  definition: string;
  category: string;
  example: string;
  authorId: string;
  isApproved: boolean;
  approvedBy: boolean;
  approvedAt: string;
  rejectionReason: string;
  imageId: string;
  image?: ImageDto; // Optional image object with URL
  audioId: string;
  moderationNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTermRequest {
  name: string;
  definition: string;
  category: string;
  example: string;
  imageId?: string;
}

export interface TermsFilters {
  category?: string;
  search?: string;
  isApproved?: boolean;
}
