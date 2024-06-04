import { google } from "googleapis";

const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/drive"]
  );

  await jwtClient.authorize();
  return jwtClient;
};

export default authorize;
