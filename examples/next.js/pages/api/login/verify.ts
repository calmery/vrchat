import { VercelRequest, VercelResponse } from "@vercel/node";
import { isTfaMethod, VRChat, VRChatAuthenticationError } from "vrchat";
import { LoginVerifyPayload, Payload } from "../../../types/api";
import { getAuth } from "../../../utils/api";

const post = async (request: VercelRequest, response: VercelResponse) => {
  const auth = getAuth(request);
  const { code, method } = (request.body as Payload<LoginVerifyPayload>) ?? {};

  if (!auth || !code || !method || !isTfaMethod(method)) {
    response.status(400).end();
    return;
  }

  const vrchat = VRChat.from(auth);

  try {
    await vrchat.verifyTfa(method, code);

    response.status(200).end();
  } catch (error) {
    if (error instanceof VRChatAuthenticationError) {
      response.status(400).end();
      return;
    }

    response.status(500).end();
  }
};

export default async (request: VercelRequest, response: VercelResponse) => {
  switch (request.method) {
    case "POST":
      await post(request, response);
      return;

    default:
      response.status(404).end();
      return;
  }
};
