// https://vrchatapi.github.io/#/UserAPI/CurrentUserDetails?id=developertype
export type VRChatUserDeveloperType =
  | "none"
  | "trusted"
  | "internal"
  | "moderator";

export type VRChatUserStatus = "join me" | "active" | "busy";

interface VRChatUserBase {
  id: string;
  username: string;
  displayName: string;
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  tags: string[];
  developerType: VRChatUserDeveloperType;
  status: VRChatUserStatus;
  statusDescription: string;
  friendKey: string;
  isFriend: boolean;
}

export interface VRChatUser extends VRChatUserBase {
  location: string;
}

export interface VRChatOwnUser extends VRChatUserBase {
  pastDisplayNames: {
    displayName: string;
    updated_at: string;
  }[];
  hasEmail: boolean;
  hasPendingEmail: boolean;
  obfuscatedEmail: string;
  obfuscatedPendingEmail: string;
  emailVerified: boolean;
  hasBirthday: boolean;
  unsubscribe: boolean;
  friends: string[];
  friendGroupNames: string[];
  currentAvatar: string;
  currentAvatarAssetUrl: string;
  acceptedTOSVersion: number;
  // Steam のアカウントからのアップグレードを行なった場合に出てきそう
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  steamDetails: { [key: string]: any }; // FIXME
  hasLoggedInFromClient: boolean;
  homeLocation: string;
  last_login: string;
  allowAvatarCopying: boolean;
}
