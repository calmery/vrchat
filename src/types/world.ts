export type VRChatWorldReleaseStatus = "public" | "private";

export interface VRChatWorld {
  id: string;
  name: string;
  authorName: string;
  totalLikes: number;
  totalVisits: number;
  capacity: number;
  imageUrl: string;
  thumbnailImageUrl: string;
  isSecure: boolean;
  releaseStatus: VRChatWorldReleaseStatus;
  organization: string;
  tags: string[];
  favorites: number;
  created_at: string;
  updated_at: string;
  publicationDate: string;
  labsPublicationDate: string;
  visits: number;
  popularity: number;
  heat: number;
  occupants: number;
}
