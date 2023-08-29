import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
import { useModalContext } from "../store/modalContext";

export const useCreateCategory = () => {
  const [newCategory, setNewCategory] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  const createCategory = async (name, updateFields) => {
    try {
      const response = await APIService.post("/admin/category", {
        name,
        updateFields,
      });
      setNewCategory(response.data);
      setIsSuccess(true);
      closeModal();
    } catch (error) {}
  };

  return {
    newCategory,
    isSuccess,
    createCategory,
  };
};
