import http from "src/config/http";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { IPost } from "src/interfaces/post.interface";

export interface UpdatePlaceProps {
  id: string;
  data: IPost;
}

const url = "post";
export const getPostList = async (): Promise<IPost[]> => {
  const res = await http.get(url);
  return res.data;
};

export const findPostByID = async (id: string) => {
  const res = await http.get(`${url}/relations/${id}`);
  return res.data;
};

export const updatePost = async ({ id, data }: UpdatePlaceProps) => {
  const token = localStorage.getItem(LOCAL_STORAGE.AccessToken);
  if (!token) {
    return null;
  }
  const res = await http.patch(
    `${url}/${id}`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
