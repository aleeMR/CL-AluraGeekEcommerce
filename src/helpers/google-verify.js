import { OAuth2Client } from "google-auth-library";

const idGoogleClient = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(idGoogleClient);

export async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: idGoogleClient,
  });

  const { email, given_name, family_name, picture } = ticket.getPayload();
  
  return {
    email,
    name: given_name,
    surname: family_name,
    image: picture,
  }
}
