import { getConfig } from "./api";

const main = async (): Promise<void> => {
  const config = await getConfig();

  if (config === null) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("API Key :", config.apiKey);
};

main();
