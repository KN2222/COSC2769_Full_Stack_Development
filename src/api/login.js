import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
import { useModalContext } from "../store/modalContext";
import { useToastContext } from "../store/toastContext";

export const useLogin = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();
  const { showToast } = useToastContext();

  const login = async (formData) => {
    try {
      const response = await APIService.post("/auth/login", formData);
      setIsSuccess(true);
      closeModal();
      showToast(200, response.data.message);
      return response.data;
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return {
    isSuccess,
    login,
  };
}