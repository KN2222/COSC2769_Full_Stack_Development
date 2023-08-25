import { APIService } from "../axios/client";

export const useCreateSubCategory = () => {
  const createSubCategory = async ({ parentId, name }) => {
    try {
      const response = await APIService.post(`/admin/category/${parentId}`, {
        name,
      });
      return response.data; // You can return the updated data if needed
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createSubCategory,
  };
};
