import { VercelRequest, VercelResponse } from "@vercel/node";
import { VRChat, VRChatUnauthenticatedError } from "vrchat";
import { getAuth } from "../../utils/api";

const put = async (request: VercelRequest, response: VercelResponse) => {
  const auth = getAuth(request);

  if (!auth) {
    response.status(401).end();
    return;
  }

  const vrchat = VRChat.from(auth);

  try {
    await vrchat.logout();
  } catch (error) {
    if (error instanceof VRChatUnauthenticatedError) {
      response.status(401).end();
      return;
    }

    response.status(500).end();
  }
};

export default async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case "PUT":
      await put(request, response);
      return;

    default:
      response.status(404).end();
      return;
  }
};
