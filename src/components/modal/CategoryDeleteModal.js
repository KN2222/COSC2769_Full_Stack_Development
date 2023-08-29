import { Modal } from "react-bootstrap";
import { useDeleteCategory } from "../../api/deleteCategory";
import { useModalContext } from "../../store/modalContext";

export const CategoryDeleteModal = (props) => {
  const { deleteCategory } = useDeleteCategory();
  const { category } = props;

  const handleDeleteCategory = () => {
    deleteCategory(category._id);
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
          Confirm to delete category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete this category?</h4>
        <p>This action is irreversible.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={handleDeleteCategory}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};
