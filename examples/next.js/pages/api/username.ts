import { VercelRequest, VercelResponse } from "@vercel/node";
import { VRChat, VRChatUnauthenticatedError } from "vrchat";
import { UsernameResponse } from "../../types/api";
import { getAuth } from "../../utils/api";

const get = async (request: VercelRequest, response: VercelResponse) => {
  const auth = getAuth(request);

  if (!auth) {
    response.status(401).end();
    return;
  }

  const vrchat = VRChat.from(auth);

  try {
    const { username } = (await vrchat.get("auth/user")) as {
      username: string;
    };

    const result: UsernameResponse = {
      data: {
        username,
      },
    };

    response.status(200).json(result);
  } catch (error) {
    if (error instanceof VRChatUnauthenticatedError) {
      response.status(401).end();
      return;
    }

    response.status(500).end();
    return;
  }
};

export default async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case "GET":
      await get(request, response);
      return;

    default:
      response.status(404).end();
      return;
  }
};
