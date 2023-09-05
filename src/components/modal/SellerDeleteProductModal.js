import { Modal } from "react-bootstrap";
import { useDeleteProduct } from "../../api/deleteProduct";
import { useModalContext } from "../../store/modalContext";

export const ProductDeleteModal = (props) => {
  const { deleteProduct } = useDeleteProduct();
  const { product, fetchSellerProduct } = props;

  const handleDeleteProduct = () => {
    deleteProduct(product._id);
    fetchSellerProduct();
    props.onHide();
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