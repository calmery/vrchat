export interface VRChatDynamicWorldRow {
  name: string;
  tag: string;
  index: number;
}

export interface VRChatAnnouncement {
  name: string;
  text: string;
}

export interface VRChatConfig {
  messageOfTheDay: string;
  timeOutWorldId: string;
  gearDemoRoomId: string;
  releaseServerVersionStandalone: string;
  downloadLinkWindows: string;
  releaseAppVersionStandalone: string;
  devAppVersionStandalone: string;
  devServerVersionStandalone: string;
  devDownloadLinkWindows: string;
  currentTOSVersion: number;
  releaseSdkUrl: string;
  releaseSdkVersion: string;
  devSdkUrl: string;
  devSdkVersion: string;
  whiteListedAssetUrls: string[];
  clientApiKey: string;
  viveWindowsUrl: string;
  sdkUnityVersion: string;
  hubWorldId: string;
  homeWorldId: string;
  tutorialWorldId: string;
  disableEventStream: boolean;
  disableAvatarGating: boolean;
  disableFeedbackGating: boolean;
  disableRegistration: boolean;
  disableUpgradeAccount: boolean;
  disableCommunityLabs: boolean;
  disableCommunityLabsPromotion: boolean;
  plugin: string;
  sdkNotAllowedToPublishMessage: string;
  sdkDeveloperFaqUrl: string;
  sdkDiscordUrl: string;
  notAllowedToSelectAvatarInPrivateWorldMessage: string;
  userVerificationTimeout: number;
  userUpdatePeriod: number;
  userVerificationDelay: number;
  userVerificationRetry: number;
  worldUpdatePeriod: number;
  moderationQueryPeriod: number;
  defaultAvatar: string;
  dynamicWorldRows: VRChatDynamicWorldRow[];
  disableAvatarCopying: boolean;
  announcements: VRChatAnnouncement[];
  address: string;
  contactEmail: string;
  supportEmail: string;
  jobsEmail: string;
  copyrightEmail: string;
  moderationEmail: string;
  disableEmail: boolean;
  appName: string;
  serverName: string;
  deploymentGroup: string;
  buildVersionTag: string;
  apiKey: string;
}
