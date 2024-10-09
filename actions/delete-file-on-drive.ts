"use server";

import { drive } from "@/lib/google-drive";

export const deleteFileOnDrive = async (fileLink: string) => {
  try {
    const linkParts = fileLink.split("/");

    const fileId = linkParts[linkParts.length - 2]; // Extract file ID from the link

    if (!fileId) {
      throw new Error("Invalid file link");
    }
    const response = await drive.files.delete({
      fileId,
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete file");
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};
