import { getVRChatConfig } from "./api";

const main = async (): Promise<void> => {
  const config = await getVRChatConfig();

  if (config === null) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("API Key :", config.apiKey);
};

main();
