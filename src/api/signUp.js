import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
import { useModalContext } from "../store/modalContext";
import { useToastContext } from "../store/toastContext";

export const useSignUp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();
  const { showToast } = useToastContext();

  const signUp = async (formData) => {
    try {
      const response = await APIService.post("/auth/signup", formData);
      setIsSuccess(true);
      closeModal();
      showToast(200, response.data.message);
      return response.data;
    } catch (error) {
      showToast(error.response.status, error.response.data.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return {
    isSuccess,
    signUp,
  };
};
