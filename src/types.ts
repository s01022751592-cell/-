export interface Project {
  id: string;
  title: string;
  period?: string;
  tags: string[];
  description: string;
  details?: string;
  imageUrl: string;
  extraImages?: string[]; // Admin can upload multiple images
  videoUrl?: string; // Admin can upload a video file (Base64) or paste a video URL
  isDefault?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  content: string;
  createdAt: string;
}
