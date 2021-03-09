export declare type VVRChatAvatarsReleaseStatus = "public" | "private" | "hidden";

export interface VRChatAvatars {
    authorId: string;
    name: string;
    authorName: string;
    imageUrl: string;
    thumbnailImageUrl: string;
    releaseStatus: string;
    created_at: string;
    updated_at: string;
    description: string;
    version: string;
}
