import { Modal } from "react-bootstrap";
import { useDeleteProduct } from "../../api/deleteProduct";
import { useToastContext } from "../../store/toastContext";

export const ProductDeleteModal = (props) => {
  const { deleteProduct } = useDeleteProduct();
  const { showToast } = useToastContext();

  const handleDeleteProduct = () => {
    try{
      deleteProduct(props.product._id);
      showToast(200, "Successfully deleted product");
      props.onHide();
    }catch (error) {
      showToast(error.response.status, error.response.data.message);

    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="w-100"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm to delete product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete this product?</h4>
        <p>This action is irreversible.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={handleDeleteProduct}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};