import { APIService } from "../axios/client";

export const useUpdateCategory = () => {
  const updateCategory = async (id, updateFields) => {
    try {
      const response = await APIService.patch(`/admin/category/${id}`, {
        updateFields,
      });
      return response.data; // You can return the updated data if needed
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  return {
    updateCategory,
  };
};
