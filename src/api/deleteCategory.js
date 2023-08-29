import { APIService } from "../axios/client";
import { useModalContext } from "../store/modalContext";
import { useToastContext } from "../store/toastContext";
export const useDeleteCategory = () => {
  const { showToast } = useToastContext();
  const { closeModal } = useModalContext();

  const deleteCategory = async (id) => {
    try {
      const response = await APIService.delete(`/admin/category/${id}`);
      showToast(response.status, response.data.message);
      closeModal();
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  };

  return {
    deleteCategory,
  };
};
