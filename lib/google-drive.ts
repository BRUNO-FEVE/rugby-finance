import { google } from "googleapis";

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_DRIVE_FOLDER_ID } =
  process.env;

if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_DRIVE_FOLDER_ID) {
  throw new Error(
    "Missing Google Service Account credentials or Drive Folder ID",
  );
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({
  version: "v3",
  auth,
});

export const DRIVE_FOLDER_ID = GOOGLE_DRIVE_FOLDER_ID;
