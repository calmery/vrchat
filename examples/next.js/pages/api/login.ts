import { VercelRequest, VercelResponse } from "@vercel/node";
import { VRChat, VRChatAuthenticationError } from "vrchat";
import { LoginPayload, LoginResponse, Payload } from "../../types/api";

const post = async ({ body }: VercelRequest, response: VercelResponse) => {
  const { username, password } = (body as Payload<LoginPayload>) ?? {};

  if (!username || !password) {
    response.status(400).end();
    return;
  }

  const vrchat = new VRChat();

  try {
    const tfa = await vrchat.login(username, password);

    const result: LoginResponse = {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        auth: vrchat.auth!,
        tfa,
      },
    };

    response.status(200).json(result);
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
