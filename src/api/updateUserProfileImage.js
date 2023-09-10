import { useCallback, useState } from "react";
import { APIService } from "../axios/client";
import { useToastContext } from "../store/toastContext";

export function UpdateUserProfileImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const { showToast } = useToastContext();

  // Define a function to handle image change
  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setSelectedImage(file);

    // Display the selected image as a preview
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreview = document.getElementById("image-preview");
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } 
  }, []);

  // Define a function to handle image upload
  const handleImageUpload = useCallback(async () => {
    if (!selectedImage) {
      console.error("No image selected.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await APIService.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Use 'multipart/form-data' for file uploads
        },
      });

      if (response.status === 200) {
        showToast(200, `Image uploaded successfully.`);

        // You may want to refresh the user's avatar or take other actions
      } else {
        console.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }, [selectedImage, showToast]);

  return { selectedImage, handleImageChange, handleImageUpload };
}
