import { getVRChatConfig } from "./api";
import { urlBuilder } from "./urlBuilder";

const main = async (): Promise<void> => {
  const config = await getVRChatConfig(urlBuilder);

  if (config === null) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("API Key :", config.apiKey);
};

main();
