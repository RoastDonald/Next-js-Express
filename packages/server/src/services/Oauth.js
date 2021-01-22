import { OAuth2Client } from "google-auth-library";
import axios from "axios";
class Oauth {
  constructor() {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  withGoogle = async (token) => {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { name, email, at_hash, exp } = ticket.getPayload();
      return { data: { name, email, hash: at_hash, exp }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  withFacebook = async (token) => {
    try {
      const data = await axios.get(
        `/me?access_token=${token}&fields=first_name,last_name,email`
      );
      console.log(JSON.stringify(data, null, 4));
    } catch (error) {
      return { data: null, error };
    }
  };
}

export default Oauth;
