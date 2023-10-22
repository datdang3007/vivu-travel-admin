import { uploadImageToDiscord } from "src/apis/upload_image.api";

export const UploadFileToDiscordWebhook = (file: any) => {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append("file", file);

    uploadImageToDiscord(formData)
      .then((res: any) => {
        if (res.attachments && res.attachments.length > 0) {
          const imageURL = res.attachments[0].url;
          resolve(imageURL);
        } else {
          console.error("Không có tệp tin đính kèm trả về từ Discord Webhook");
          resolve(null);
        }
      })
      .catch((err: any) => {
        console.error(err);
        resolve(null);
      });
  });
};
