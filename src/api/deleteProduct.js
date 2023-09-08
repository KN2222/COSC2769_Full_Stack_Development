import { APIService } from "../axios/client";
import { useModalContext } from "../store/modalContext";
import { useToastContext } from "../store/toastContext";
export const useDeleteProduct = () => {
  const { showToast } = useToastContext();
  const { closeModal } = useModalContext();

  const deleteProduct = async (id) => {
    try {
      const response = await APIService.delete(`/seller/product/${id}`);
      closeModal();
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  };

  return {
    deleteProduct,
  };
};
