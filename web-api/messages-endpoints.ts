import axios from "axios";

import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:5259/api/messages"
    : "http://192.168.0.127:5259/api/messages";

export const getMessages = async (
  userId: number,
  token: string
): Promise<Message[]> => {
  const response = await axios
    .get(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
  return response.data;
};

export const sendMessageToChatbot = async (
  userId: number,
  content: string,
  token: string
): Promise<Message> => {
  const response = await axios
    .post(
      `${BASE_URL}/add`,
      {
        userId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
  return response.data;
};

const deleteOldMessages = async (userId: number, token: string) => {
  await axios
    .delete(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const scheduleDeleteOldMessages = (userId: number, token: string) => {
  setInterval(() => {
    deleteOldMessages(userId, token);
  }, 1000 * 60 * 60);
};
