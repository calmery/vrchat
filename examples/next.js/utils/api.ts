import { VercelRequest } from "@vercel/node";

export const getAuth = (request: VercelRequest) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return null;
  }

  const matched = authorization.match(/^Token\s+(.+)$/);

  if (!matched) {
    return null;
  }

  return matched[1];
};
