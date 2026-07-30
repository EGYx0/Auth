import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/users/register", data);

      return response.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/users/login", data);

      return response.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/users/logout");
    },
  });
};
