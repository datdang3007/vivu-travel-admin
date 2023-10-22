import axios from "axios";
import { PROCESS_ENV } from "src/constants/env";

const url = PROCESS_ENV.DISCORD_WEBHOOK ?? "";
export const uploadImageToDiscord = async (
  formData: FormData
): Promise<any> => {
  const res = await axios.post(url, formData);
  return res?.data;
};
