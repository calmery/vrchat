import { getAPIKey } from "./api";

const main = async (): Promise<void> => {
  const apiKey = await getAPIKey();

  if (apiKey === null) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("API Key :", apiKey);
};

main();
