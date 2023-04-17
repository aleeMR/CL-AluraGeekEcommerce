import { OAuth2Client, TokenPayload } from "google-auth-library";

const idGoogleClient = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(idGoogleClient);

export async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: idGoogleClient,
  });

  const { email, given_name, family_name, picture } = ticket.getPayload() as TokenPayload;
  
  return {
    email,
    name: given_name,
    surname: family_name,
    image: picture,
  };
}
