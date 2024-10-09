"use server";

import { drive, DRIVE_FOLDER_ID } from "../lib/google-drive";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

interface FileUploadData {
  name: string;
  type: string;
  data: ArrayBuffer;
}

function bufferToStream(buffer: ArrayBuffer) {
  const readable = new Readable();
  readable._read = () => {}; 
  readable.push(Buffer.from(buffer));
  readable.push(null);
  return readable;
}


export const uploadFileOnDrive = async (fileData: FileUploadData) => {
  const fileMetadata = {
    name: fileData.name || "untitled",
    parents: [DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: fileData.type,
    body: bufferToStream(fileData.data),
  };

  try {
    console.log("Attempting to upload file:", fileData.name);
    console.log("MIME type:", fileData.type);

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name, webViewLink",
    });

    const uploadedFile = response.data;

    console.log("File uploaded successfully:", uploadedFile);

    return {
      success: true,
      fileId: uploadedFile.id,
      fileName: uploadedFile.name,
      webViewLink: uploadedFile.webViewLink,
    };
  } catch (error) {
    console.error("Detailed error uploading file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred during file upload",
    };
  }
};
