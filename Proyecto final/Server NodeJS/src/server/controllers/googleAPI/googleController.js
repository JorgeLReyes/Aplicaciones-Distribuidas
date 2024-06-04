import authorize from "../../config/googleClient.js";
import path from "node:path";
import { google } from "googleapis";
import fs from "node:fs";

const getFileIdFromUrl = (url) => url.match(/\/d\/([^/]+)\/view/)[1];

const uploadFile = async (url) => {
  const authClient = await authorize();

  return new Promise((resolve, rejected) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    const fileStream = fs.createReadStream(url);
    let name = path.basename(fileStream.path, ".pdf");

    let fileMetaData = {
      name,
      parents: [process.env.GOOGLE_FOLDER_ID],
    };

    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: fileStream,
          mimeType: "application/pdf",
        },
        fields: "id",
      },
      (error, file) => {
        if (error) {
          rejected(error);
        }
        resolve(file.data.id);
      }
    );
  });
};

const deleteFile = async (url) => {
  try {
    const authClient = await authorize();

    const drive = google.drive({ version: "v3", auth: authClient });

    const fileId = getFileIdFromUrl(url);

    const response = await drive.files.delete({ fileId });
    if (response.status >= 400)
      throw "Error al eliminar el archivo con el ID " + fileId;
    return " y el archivo anterior ha sido eliminado con exito en Drive";
  } catch (error) {
    throw "Archivo no eliminado";
  }
};

const downloadAndSaveFile = async (fileUrl) => {
  const authClient = await authorize();

  const drive = google.drive({ version: "v3", auth: authClient });

  const fileId = getFileIdFromUrl(fileUrl);

  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return response.data;
};

export default {
  uploadFile,
  downloadAndSaveFile,
  deleteFile,
};
